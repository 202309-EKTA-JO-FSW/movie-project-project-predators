import React, { useState, useEffect } from 'react';
import { getPopularMovies } from "@/util/API"
import Link from 'next/link';

export default function PopularMovies(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ id: 1 });

  const items = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5},
    { id: 6},
    { id: 7},
    { id: 8},
    { id: 9},
    { id: 10},

  ];
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
  const handleSelectChange = async (event) => {
    setLoading(true);
    const pageId = parseInt(event.target.value, 10);
    const selected = items.find((item) => item.id === pageId);
    setPage({...selected});
    await setPopular(selected);
  };
  useEffect(() => {
    const fetchData = async () => {
      await setPopular({ id: 1 });
    };
    fetchData();
  }, []);
  return (
    <div>
       {page && (
        <div>
          <h3> Page number: {page.id ?? 1}</h3>
        </div>
      )}
    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {
          data.map(movie => {
            console.log(movie)
            return <li key={movie.id}>
                <h2> {movie.original_title}</h2>
                <Link href={`/movie/${movie.id}`}>
                  <img
                    src={'https://image.tmdb.org/t/p/w235_and_h235_face'+movie.backdrop_path}
                  />
                </Link>
              </li>;
            })
          }
      </ul>
    )}
    <h2>Pages:</h2>
      <select onChange={handleSelectChange} value={page ? page.id : '1'}>
         <option value="" disabled>
          Select page
        </option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id}
          </option>
        ))}
      </select>
  </div>
    )
}
