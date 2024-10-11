import {
    COUNTRY_CODE,
    COURSE_CONTENT_HASH,
    GQL_API,
    KA_LOCALE,
} from "../constants";

/**
 * @param {string} path
 * @returns {Promise<ContentForPathResponse>}
 */
export async function contentForPath(path) {
    const params = new URLSearchParams({
        hash: COURSE_CONTENT_HASH,
        variables: JSON.stringify({
            path,
            countryCode: COUNTRY_CODE,
            kaLocale: KA_LOCALE,
        }),
    });

    return fetch(`${GQL_API}/ContentForPath?` + params.toString()).then((res) =>
        res.json(),
    );
}
