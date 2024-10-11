import { learnMenuTopicsQuery } from "./endpoints/learnMenuTopicsQuery";
import { contentForPath } from "./endpoints/contentForPath";
import { getOrCreatePracticeTask } from "./endpoints/getOrCreatePracticeTask";
import { getAssessmentItem } from "./endpoints/getAssessmentItem";

import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { OUTPUT_DIR } from "./constants";

async function main() {
    const courseList = await learnMenuTopicsQuery();
    if (!courseList || !courseList.data.learnMenuTopics) {
        console.error("Failed to retrieve course list");
        return;
    }

    for (const course of courseList.data.learnMenuTopics) {
    // for (const course of [
    //     {
    //         slug: "ap-macroecon",
    //         href: "/economics-finance-domain/ap-macroeconomics",
    //     },
    // ]) {
        console.log(`Processing course slug: ${course.slug}`);
        const courseData = await contentForPath(course.href);
        const courseContent =
            courseData?.data?.contentRoute?.listedPathData?.course;

        if (!courseContent || !courseContent.unitChildren) {
            console.warn(`No unit children found for course: ${course.id}`);
            continue;
        }

        await processUnits(courseContent);
    }
}

async function processUnits(courseContent) {
    for (const unit of courseContent.unitChildren) {
        console.log(`  Processing unit: ${unit.id}, slug: ${unit.slug}`);
        if (unit.__typename !== "Unit" || !unit.allOrderedChildren) {
            console.warn(
                `Skipping non-Unit type or empty children for unit: ${unit.slug} (${unit.id})`,
            );
            continue;
        }

        for (const lesson of unit.allOrderedChildren) {
            await processLesson(lesson, unit, courseContent);
        }
    }
}

async function processLesson(lesson, unit, courseContent) {
    console.log(`    Processing lesson: ${lesson.id}, slug: ${lesson.slug}`);
    if (lesson.__typename !== "Lesson" || !lesson.curatedChildren) {
        console.warn(
            `Skipping non-Lesson type or empty curated children for lesson: ${lesson.slug} (${lesson.id})`,
        );
        return;
    }

    for (const exercise of lesson.curatedChildren) {
        await processExercise(exercise, lesson, unit, courseContent);
    }
}

async function processExercise(exercise, lesson, unit, courseContent) {
    if (exercise.__typename === "Exercise") {
        console.log(
            `      Processing exercise (${exercise.problemTypes?.length}): ${exercise.id}, slug: ${exercise.slug}`,
        );

        const practiceTask = await getOrCreatePracticeTask(exercise.id);
        if (
            !practiceTask ||
            !practiceTask.data.getOrCreatePracticeTask?.result?.userTask
                ?.userExercises
        ) {
            console.warn(
                `No user exercises found for exercise: ${exercise.id}`,
            );
            return;
        }

        const userExercises =
            practiceTask.data.getOrCreatePracticeTask.result.userTask
                .userExercises;

        for (const userExercise of userExercises) {
            console.log(
                `        Processing user exercise: ${userExercise.exerciseModel.nodeSlug}`,
            );

            if (!userExercise.exerciseModel?.problemTypes) {
                console.warn(
                    `No problem types found for user exercise: ${exercise.id}`,
                );
                return;
            }

            const problemTypes = userExercise.exerciseModel?.problemTypes;

            for (const problemType of problemTypes) {
                console.log(
                    `          Processing problem type: ${problemType.name}`,
                );
                for (const item of problemType.items) {
                    if (item.__typename === "ProblemTypeAssessmentItem") {
                        console.log(
                            `            Fetching assessment item: ${item.id}`,
                        );
                        const assessmentItem = await getAssessmentItem(
                            exercise.id,
                            item.id,
                        );

                        if (
                            !assessmentItem ||
                            !assessmentItem?.data?.assessmentItem
                        ) {
                            console.warn(
                                `No assessment item found for exercise: ${exercise.id}, item: ${item.id}`,
                            );
                            return;
                        }

                        await processAssessmentItem(
                            assessmentItem,
                            exercise,
                            lesson,
                            unit,
                            courseContent,
                        );
                    }
                }
            }
        }
    }
}

/**
 * @param {AssessmentItemResponse} assessmentItem
 * @param {EdChild} exercise
 * @param {EdChild} lesson
 * @param {UnitChild} unit
 * @param {Course} courseContent
 * @returns {Promise<void>}
 */
async function processAssessmentItem(
    assessmentItem,
    exercise,
    lesson,
    unit,
    courseContent,
) {
    const { item } = assessmentItem.data.assessmentItem;

    const exercisePath = join(
        OUTPUT_DIR,
        `[${courseContent.id}] ${courseContent.slug}`,
        `[${unit.id}] ${unit.slug}`,
        `[${lesson.id}] ${lesson.slug}`,
        `[${exercise.id}] ${exercise.slug}`,
    );
    const fileName = `[${exercise.id}-${item.id}] ${item.problemType}.json`;
    const filePath = join(exercisePath, fileName);

    const data = assessmentItem.data.assessmentItem.item;
    try {
        item.itemData = JSON.parse(data.itemData);
    } catch {}

    try {
        await mkdir(exercisePath, { recursive: true });
        await Bun.write(filePath, JSON.stringify(assessmentItem, null, 4));
        console.log(`        Saved assessment item to: ${filePath}`);
    } catch (error) {
        console.error(
            `        Failed to save assessment item: ${error.message}`,
        );
    }
}

void main();
