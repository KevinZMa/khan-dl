import { COURSES_HASH, GQL_API, REGION } from "../constants";

/**
 * @returns {Promise<LearnMenuTopicsQueryResponse>}
 */
export async function learnMenuTopicsQuery() {
    const params = new URLSearchParams({
        hash: COURSES_HASH,
        variables: JSON.stringify({
            region: REGION,
        }),
    });

    return fetch(`${GQL_API}/learnMenuTopicsQuery?` + params.toString()).then(
        (response) => response.json(),
    );
}
