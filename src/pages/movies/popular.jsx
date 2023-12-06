import React, { useState, useEffect } from 'react';
import { getPopularMovies } from "@/util/API"
import Link from 'next/link';

export default function PopularMovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ id: 1 });
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const setPopular = async (page) => {
    try {
      const result = await getPopularMovies(page.id);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await setPopular({ id: 1 });
  };

  const handleShowMoreClick = async () => {
    setLoading(true);
    const nextPageId = page.id + 1;
    const nextPage = { id: nextPageId };
    setPage(nextPage);
    await setPopular(nextPage);
  };

  return (
    <div className='wholehome'>
      {loading ? (
        <p>Working on it...</p>
      ) : (
        <div className='home'>
          <h3 className='introm'>What's Popular</h3>
        <div className='latestmovies'>
          {data.map(movie => (
            <div key={movie.id} className='latest'>
              <Link href={`/movie/${movie.id}`}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={`${movie.original_title} profile`} />
              </Link>
              <div className='latest-content'>
                <h2> {movie.original_title}</h2>
              </div> 
            </div>
          ))}
        </div>
        <div className='buttonall'>    
            <button className='button' onClick={handleShowMoreClick}>Show more</button>
          </div>
        </div>
      )}
    </div>
  
  );

}