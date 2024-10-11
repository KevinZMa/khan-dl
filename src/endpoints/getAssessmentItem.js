import { GQL_API } from "../constants";

/**
 * @param {string} exerciseId
 * @param {string} itemId
 * @returns {Promise<AssessmentItemResponse>}
 */
export async function getAssessmentItem(exerciseId, itemId) {
    const graphql = JSON.stringify({
        query: `query getAssessmentItem($input: AssessmentItemInput!) {
  assessmentItem(input: $input) {
    item {
      id
      sha
      problemType
      itemData
      __typename
    }
    error {
      code
      debugMessage
      __typename
    }
    __typename
  }
}`,
        variables: {
            input: {
                exerciseId,
                itemId,
            },
        },
    });

    const requestOptions = {
        method: "POST",
        body: graphql,
    };

    return fetch(`${GQL_API}/getAssessmentItem`, requestOptions).then(
        (response) => response.json(),
    );
}
