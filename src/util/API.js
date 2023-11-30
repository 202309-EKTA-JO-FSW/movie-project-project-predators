// The APIs to be used in our project

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
// variables are stored in an .env file to allow being used more than once

export async function getTrending() {
    // using await and fetch to make the code more readable than using options and .then
    const res = await fetch(`${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`)
    const data = await res.json()
    return data.results
}

export async function getTopRated() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`)
    const data = await res.json()
    return data.results
}

export async function getMovieDetails () {
    const res = await fetch(`${BASE_URL}/movie/movie_id?language=en-US&api_key=${API_KEY}`)
    const data = await res.json()
    return data.results
}

export async function getMovieCredits () {
    const res = await fetch(`${BASE_URL}/movie/movie_id/credits?language=en-US&api_key=${API_KEY}`)
    const data = await res.json()
    return data.results
}

// The idea of refactoring is a good practice when working with sensetive data like APIs, as well as redundant information that is being shared multiple times

// Original code:
// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer 97296fe3de1155f2e9ae05adf115394c'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));