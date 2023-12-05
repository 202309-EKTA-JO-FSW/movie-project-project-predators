import React from 'react';
import { useRouter } from 'next/router';
import { getMovieDetails } from '@/util/API';

function Movie() {
  const router = useRouter();
  const { movieId } = router.query;
  console.log(movieId)
  const movieDetails = getMovieDetails(movieId)
  console.log(movieDetails)

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {movieId}</p>
      <div>
        <h3 style={{color : 'white'}}>{movieDetails.original_title}</h3>
      </div>
    </div>
  );
};

export default Movie;