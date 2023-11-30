const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getActors = async () => {
    const res = await fetch(`${BASE_URL}/person/popular?language=en-US&page=1&api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}