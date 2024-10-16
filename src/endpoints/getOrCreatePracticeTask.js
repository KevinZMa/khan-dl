import { GQL_API } from "../constants";

/**
 * @param {string} exerciseId
 * @returns {Promise<PracticeTaskResponse>}
 */
export async function getOrCreatePracticeTask(exerciseId) {
    const myHeaders = new Headers();
    myHeaders.append("x-ka-fkey", "1");
    myHeaders.append("Content-Type", "application/json");

    const graphql = JSON.stringify({
        query: `mutation getOrCreatePracticeTask($input: GetOrCreatePracticeTaskInput!) {
  getOrCreatePracticeTask(input: $input) {
    result {
      error {
        code
        debugMessage
        __typename
      }
      userTask {
        ...userTaskFields
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment userExerciseFields on UserExercise {
  exerciseModel: exercise {
    id
    assessmentItemCount: numAssessmentItems
    displayName
    isQuiz
    isSkillCheck
    name
    nodeSlug
    progressKey
    translatedDisplayName
    relatedContent {
      id
      contentKind
      kind
      thumbnailUrl
      translatedTitle
      topicPaths {
        path {
          id
          kind
          slug
          __typename
        }
        __typename
      }
      ... on Article {
        kaUrl
        nodeSlug
        relativeUrl
        slug
        __typename
      }
      ... on Video {
        duration
        imageUrl
        kaUrl
        nodeSlug
        relativeUrl
        slug
        translatedYoutubeId
        __typename
      }
      __typename
    }
    relatedVideos {
      contentKind
      duration
      id
      imageUrl
      kaUrl
      kind
      nodeSlug
      progressKey
      relativeUrl
      slug
      thumbnailUrl
      translatedDescription
      translatedTitle
      translatedYoutubeId
      __typename
    }
    problemTypes {
      items {
        id
        live
        sha
        __typename
      }
      name
      relatedVideos
      __typename
    }
    translatedProblemTypes {
      items {
        id
        live
        sha
        __typename
      }
      name
      relatedVideos
      __typename
    }
    __typename
  }
  exercise: exerciseName
  fpmMasteryLevel
  lastAttemptNumber
  lastCountHints
  lastDone
  lastMasteryUpdate
  longestStreak
  maximumExerciseProgressDt: maximumExerciseProgressDate
  streak
  totalCorrect
  totalDone
  __typename
}

fragment userTaskFields on PracticeUserTask {
  cards {
    done
    cardType
    ... on ProblemCard {
      exerciseName
      problemType
      __typename
    }
    __typename
  }
  includeSkipButton
  task {
    contentKey
    exerciseLength
    id
    key
    pointBounty
    pointsEarned
    slug
    taskType
    timeEstimate {
      lowerBound
      upperBound
      __typename
    }
    completionCriteria {
      name
      __typename
    }
    promotionCriteria {
      name
      value
      __typename
    }
    reservedItems
    reservedItemsCompleted
    taskAttemptHistory {
      correct
      timeDone
      seenHint
      itemId
      __typename
    }
    __typename
  }
  userExercises {
    ...userExerciseFields
    __typename
  }
  __typename
}`,
        variables: {
            input: {
                exerciseId: exerciseId,
            },
        },
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
    };

    return fetch(`${GQL_API}/getOrCreatePracticeTask`, requestOptions).then(
        (response) => response.json(),
    );
}
