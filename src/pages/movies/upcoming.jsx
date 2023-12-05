import React, { useState, useEffect } from 'react';
import { getUpcoming } from "@/util/API";
import Link from 'next/link';

export default function Upcoming() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ id: 1 });
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const setUpcoming = async (page) => {
    try {
      const result = await getUpcoming  (page.id);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await setUpcoming({ id: 1 });
  };

  const handleShowMoreClick = async () => {
    setLoading(true);
    const nextPageId = page.id + 1;
    const nextPage = { id: nextPageId };
    setPage(nextPage);
    await setUpcoming(nextPage);
  };

  return (
    <div className='header'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='latestmovies'>
          {data.map(movie => (
            <div key={movie.id} className='latest'>
              <h2> {movie.original_title}</h2>
              <Link href={`/movie/${movie.id}`}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={`${movie.original_title} profile`} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <button className='button' onClick={handleShowMoreClick}>Show more</button>
    </div>
  );
}
