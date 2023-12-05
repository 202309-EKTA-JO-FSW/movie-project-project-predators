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
    console.error('Error fetching data', error)
    return [] 
  }
}  

export async function getActor(actorId) {
    try {
        const res = await fetch(`${BASE_URL}/person/${actorId}?api_key=${API_KEY_HADEEL}`);
        return await res.json();
      } catch (error) {
        console.error('Error fetching data:',error);
        return [];
      }
}

export async function getTrending() {
    try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY_MASH}`)
    const data = await res.json()
    return data.results 
    } catch (error) {
      console.error('Error fetching data:',error);
      return [];
    }
}

export async function getMovieDetails(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US&api_key=${API_KEY_MASH}`)
    const data = await res.json()
    return data
    } catch (error) {
      console.error('Error fetching data:',error);
      return [];
    }
}

export async function getMovieRelease(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/release_dates`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();

      const usRelease = data.results.find(entry => entry.iso_3166_1 === "US");

      if (usRelease) {
        return usRelease;
      } else {
        console.error('Release information not found for the United States.');
        return null;
      }
    } else {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getRuntime(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/translations`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();

      const runtimeEntry = data.translations.find(entry => entry.iso_3166_1 === "US");

      if (runtimeEntry && runtimeEntry.data && runtimeEntry.data.runtime) {
        const totalMinutes = runtimeEntry.data.runtime;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedRuntime = `${hours}h ${minutes}m`;
        return formattedRuntime;
      } else {
        console.error('Runtime information not found for the United States.');
        return null;
      }
    } else {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


export async function getMovieCredits(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/credits`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getRelatedMovies(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      // console.log('API Response:', data); 
      return data.results
    } else {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching related movies:', error);
    return [];
  }
}

export async function getTrailer(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      // console.log('API Response:', data); 
      return data.results
    } else {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching related movies:', error);
    return [];
  }
}

export async function getProduction(movieId) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzI5NmZlM2RlMTE1NWYyZTlhZTA1YWRmMTE1Mzk0YyIsInN1YiI6IjY1Njc2MDBiYTM0OTExMDBhYzU4Njg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOnFwRX8GjPQXxj7Zkd-EqMIQ3UhSWwImA3lyrHVXAk`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log('API Response:', data.results.US.flatrate[0]); 
      return data.results.US.flatrate[0]
    } else {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching related movies:', error);
    return [];
  }
}

