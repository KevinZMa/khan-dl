export interface PracticeTaskResponse {
    data: Data;
}

export interface Data {
    getOrCreatePracticeTask: GetOrCreatePracticeTask;
}

export interface GetOrCreatePracticeTask {
    __typename: string;
    result:     Result;
}

export interface Result {
    __typename: string;
    error:      null;
    userTask:   UserTask;
}

export interface UserTask {
    __typename:        string;
    cards:             Card[];
    includeSkipButton: boolean;
    task:              Task;
    userExercises:     UserExercise[];
}

export interface Card {
    __typename:   string;
    cardType:     string;
    done:         boolean;
    exerciseName: string;
    problemType:  null;
}

export interface Task {
    __typename:             string;
    completionCriteria:     CompletionCriteria;
    contentKey:             string;
    exerciseLength:         number;
    id:                     string;
    key:                    string;
    pointBounty:            number;
    pointsEarned:           number;
    promotionCriteria:      PromotionCriteria;
    reservedItems:          string[];
    reservedItemsCompleted: string[];
    slug:                   string;
    taskAttemptHistory:     TaskAttemptHistory[];
    taskType:               string;
    timeEstimate:           TimeEstimate;
}

export interface CompletionCriteria {
    __typename: string;
    name:       string;
}

export interface PromotionCriteria {
    __typename: string;
    name:       string;
    value:      number;
}

export interface TaskAttemptHistory {
    __typename: string;
    correct:    boolean;
    itemId:     string;
    seenHint:   boolean;
    timeDone:   Date;
}

export interface TimeEstimate {
    __typename: string;
    lowerBound: number;
    upperBound: number;
}

export interface UserExercise {
    __typename:                string;
    exercise:                  string;
    exerciseModel:             ExerciseModel;
    fpmMasteryLevel:           string;
    lastAttemptNumber:         number;
    lastCountHints:            number;
    lastDone:                  Date;
    lastMasteryUpdate:         null;
    longestStreak:             number;
    maximumExerciseProgressDt: null;
    streak:                    number;
    totalCorrect:              number;
    totalDone:                 number;
}

export interface ExerciseModel {
    __typename:             string;
    assessmentItemCount:    number;
    displayName:            string;
    id:                     string;
    isQuiz:                 boolean;
    isSkillCheck:           boolean;
    name:                   string;
    nodeSlug:               string;
    problemTypes:           ProblemType[];
    progressKey:            string;
    relatedContent:         Related[];
    relatedVideos:          Related[];
    translatedDisplayName:  string;
    translatedProblemTypes: ProblemType[];
}

export interface ProblemType {
    __typename:    string;
    items:         Item[];
    name:          string;
    relatedVideos: string[];
}

export interface Item {
    __typename: ItemTypename;
    id:         string;
    live:       boolean;
    sha:        string;
}

export enum ItemTypename {
    ProblemTypeAssessmentItem = "ProblemTypeAssessmentItem",
}

export interface Related {
    __typename:             Typename;
    contentKind:            Typename;
    duration:               number;
    id:                     string;
    imageUrl:               string;
    kaUrl:                  string;
    kind:                   Typename;
    nodeSlug:               string;
    relativeUrl:            string;
    slug:                   string;
    thumbnailUrl:           string;
    topicPaths?:            TopicPath[];
    translatedTitle:        string;
    translatedYoutubeId:    string;
    progressKey?:           string;
    translatedDescription?: string;
}

export enum Typename {
    Topic = "Topic",
    Video = "Video",
}

export interface TopicPath {
    __typename: TopicPathTypename;
    path:       Path[];
}

export enum TopicPathTypename {
    TopicPath = "TopicPath",
}

export interface Path {
    __typename: PurpleTypename;
    id:         string;
    kind:       Typename;
    slug:       string;
}

export enum PurpleTypename {
    TopicPathSegment = "TopicPathSegment",
}
