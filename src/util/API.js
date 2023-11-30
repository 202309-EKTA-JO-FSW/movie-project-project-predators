const API_KEY_HADEEL = process.env.NEXT_PUBLIC_API_KEY_HADEEL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_ACTOR;

export const getActors = async () => {
    const res = await fetch(`${BASE_URL}/person/popular?language=en-US&page=1&api_key=${API_KEY_HADEEL}`);
    const data = await res.json();
    return data.results;
}
