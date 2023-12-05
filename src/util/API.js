const API_KEY_HADEEL = process.env.NEXT_PUBLIC_API_KEY_HADEEL;
const API_KEY_MASH = process.env.NEXT_PUBLIC_API_KEY_MASH
// Diala's API
// Ahmad's API

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// The APIs to be used in our project
// variables are stored in an .env file to allow being used more than once

export async function getActors(page) {
    try {
        const res = await fetch(`${BASE_URL}/person/popular?language=en-US&page=${page??1}&api_key=${API_KEY_HADEEL}`);
        const data = await res.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching data:',error);
        return [];
      }
}

export async function getPopularMovies (page) {
  try {
      const res = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=${page??1}&api_key=${API_KEY_MASH}`)
      const data = await res.json();
      console.log('API Response:', data)
      return data.results
    } catch (error) {
      console.error('Error fetching data:',error);
      return [];
    }
}


// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/movie/1075794?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

export async function getMovieDetails(movieId) {

const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk',} 
};

const res = await fetch(url, options)
const data = await res.json();
      console.log('API Response:', data)
      return data;
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
