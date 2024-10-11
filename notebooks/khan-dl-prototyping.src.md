<!-- srcbook:{"language":"typescript","tsconfig.json":{"compilerOptions":{"module":"nodenext","moduleResolution":"nodenext","target":"es2022","resolveJsonModule":true,"noEmit":true,"allowImportingTsExtensions":true},"include":["src/**/*"],"exclude":["node_modules"]}} -->

# khan-dl prototyping

###### package.json

```json
{
  "type": "module",
  "dependencies": {
    "tsx": "latest",
    "typescript": "latest",
    "@types/node": "latest"
  },
  "devDependencies": {
    "prettier": "latest"
  },
  "prettier": {
    "semi": true,
    "singleQuote": true
  }
}
```

###### courses.ts

```typescript
const params = new URLSearchParams({
  hash: '1631090661',
  variables: JSON.stringify({
    region: 'US-CA'
  })
});

fetch('https://www.khanacademy.org/api/internal/graphql/learnMenuTopicsQuery?' + params.toString())
  .then((response) => response.json())
  .then((result) => console.dir(result, { depth: 5 }))
  .catch((error) => console.error(error));
```

###### exercises.ts

```typescript
const params = new URLSearchParams({
  hash: '3712657851',
  variables: JSON.stringify({
    path: 'economics-finance-domain/ap-microeconomics/basic-economic-concepts/ap-economics-introduction/e/scarcity',
    countryCode: 'US',
    kaLocale: 'en'
  })
});

const res = await fetch("https://www.khanacademy.org/api/internal/graphql/ContentForPath?" + params.toString());
const json = await res.json();
console.log(json.data.contentRoute.listedPathData.course.id);
console.dir(json.data.contentRoute.listedPathData.course.masterableExercises, { depth: 4 });

```

###### exerciseProblems.ts

```typescript
const myHeaders = new Headers();
myHeaders.append("x-ka-fkey", "1");
myHeaders.append("Content-Type", "application/json");


const graphql = JSON.stringify({
  query: "mutation getOrCreatePracticeTask($input: GetOrCreatePracticeTaskInput!) {\n  getOrCreatePracticeTask(input: $input) {\n    result {\n      error {\n        code\n        debugMessage\n        __typename\n      }\n      userTask {\n        ...userTaskFields\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment userExerciseFields on UserExercise {\n  exerciseModel: exercise {\n    id\n    assessmentItemCount: numAssessmentItems\n    displayName\n    isQuiz\n    isSkillCheck\n    name\n    nodeSlug\n    progressKey\n    translatedDisplayName\n    relatedContent {\n      id\n      contentKind\n      kind\n      thumbnailUrl\n      translatedTitle\n      topicPaths {\n        path {\n          id\n          kind\n          slug\n          __typename\n        }\n        __typename\n      }\n      ... on Article {\n        kaUrl\n        nodeSlug\n        relativeUrl\n        slug\n        __typename\n      }\n      ... on Video {\n        duration\n        imageUrl\n        kaUrl\n        nodeSlug\n        relativeUrl\n        slug\n        translatedYoutubeId\n        __typename\n      }\n      __typename\n    }\n    relatedVideos {\n      contentKind\n      duration\n      id\n      imageUrl\n      kaUrl\n      kind\n      nodeSlug\n      progressKey\n      relativeUrl\n      slug\n      thumbnailUrl\n      translatedDescription\n      translatedTitle\n      translatedYoutubeId\n      __typename\n    }\n    problemTypes {\n      items {\n        id\n        live\n        sha\n        __typename\n      }\n      name\n      relatedVideos\n      __typename\n    }\n    translatedProblemTypes {\n      items {\n        id\n        live\n        sha\n        __typename\n      }\n      name\n      relatedVideos\n      __typename\n    }\n    __typename\n  }\n  exercise: exerciseName\n  fpmMasteryLevel\n  lastAttemptNumber\n  lastCountHints\n  lastDone\n  lastMasteryUpdate\n  longestStreak\n  maximumExerciseProgressDt: maximumExerciseProgressDate\n  streak\n  totalCorrect\n  totalDone\n  __typename\n}\n\nfragment userTaskFields on PracticeUserTask {\n  cards {\n    done\n    cardType\n    ... on ProblemCard {\n      exerciseName\n      problemType\n      __typename\n    }\n    __typename\n  }\n  includeSkipButton\n  task {\n    contentKey\n    exerciseLength\n    id\n    key\n    pointBounty\n    pointsEarned\n    slug\n    taskType\n    timeEstimate {\n      lowerBound\n      upperBound\n      __typename\n    }\n    completionCriteria {\n      name\n      __typename\n    }\n    promotionCriteria {\n      name\n      value\n      __typename\n    }\n    reservedItems\n    reservedItemsCompleted\n    taskAttemptHistory {\n      correct\n      timeDone\n      seenHint\n      itemId\n      __typename\n    }\n    __typename\n  }\n  userExercises {\n    ...userExerciseFields\n    __typename\n  }\n  __typename\n}",
  variables: {"input":{"exerciseId":"x5a0b1c16f81ff951",}}
})
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: graphql
};

const res = await fetch("https://www.khanacademy.org/api/internal/graphql/getOrCreatePracticeTask", requestOptions)
  .then((response) => response.json())

function printProblemTypesWithIds(res) {
  const userExercises = res.data.getOrCreatePracticeTask.result.userTask.userExercises;

  for (let exercise of userExercises) {
    const problemTypes = exercise.exerciseModel.problemTypes;

    for (let problemType of problemTypes) {
      console.log(`Problem Type: ${problemType.name}`);
      console.log('Items:');

      for (let item of problemType.items) {
        if (item.__typename === 'ProblemTypeAssessmentItem') {
          console.log(` - ID: ${item.id}`);
        }
      }

      console.log();
    }
  }
}

console.log(`Exercise slug: ${res.data.getOrCreatePracticeTask.result.userTask.task.slug}`)
printProblemTypesWithIds(res);

```

###### problemContent.ts

```typescript
const graphql = JSON.stringify({
  query: "query getAssessmentItem($input: AssessmentItemInput!) {\n  assessmentItem(input: $input) {\n    item {\n      id\n      sha\n      problemType\n      itemData\n      __typename\n    }\n    error {\n      code\n      debugMessage\n      __typename\n    }\n    __typename\n  }\n}",
  variables: {"input":{"exerciseId":"x5a0b1c16f81ff951","itemId":"x04d9856a6c4d3087"}}
})

const requestOptions = {
  method: "POST",
  body: graphql,
};

fetch("https://www.khanacademy.org/api/internal/graphql/getAssessmentItem", requestOptions)
  .then((response) => response.json())
  .then((result) => console.dir(result, { depth: null }))
  .catch((error) => console.error(error));
```
