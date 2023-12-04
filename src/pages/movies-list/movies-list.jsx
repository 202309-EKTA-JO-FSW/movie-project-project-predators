import React, { useState, useEffect } from 'react';
import { getMovieList } from "@/util/API"
import Link from 'next/link';

export default function Test() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ id: 1 });
  const [movieType, setMovieType] = useState(  { id: "top_rated" ,label:"Top Rate"});

  const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },

  ];
  const moviesType = [
    { id: "top_rated" ,label:"Top Rate"},
    { id: "popular" ,label:"Popular"},
    { id: "latest" ,label:"Latest"},
    { id: "now_playing" ,label:"Now Playing"},
    { id: "upcoming" ,label:"Upcoming"},
  

  ];
  const setMoviesList = async (page) => {
    try {
      const result = await getMovieList(page.id);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const setMoviesType = async (type) => {
    try {
      const result = await getMovieList(page.id,type.id);
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
    setPage({ ...selected });
    await setMoviesList(selected);
  };
  const handleCatChange = async (event) => {
    setLoading(true);
    const movieTypeId = event.target.value;
    const selected = moviesType.find((item) => item.id === movieTypeId);
    setMovieType({ ...selected });

    await setMoviesType(selected);
  };
  useEffect(() => {
    const fetchData = async () => {
      await setMoviesList({ id: 1 });
      setMoviesType({ id: "top_rated" })
    };
    fetchData();
  }, []);
  return (
    <div>
       <h2>Movie Type:</h2>
      <select onChange={handleCatChange} value={movieType ? movieType.id : '0'}>
        <option value="" disabled>
          Select Movie Type
        </option>
        {moviesType.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      {page && (
        <div>
          <h3> Page number: {page.id ?? 1}</h3>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{display:'flex',gap:"1rem", flexWrap:"wrap"}} >

            {
              data?.map(movie => {
                return <div key={movie.id}>
                  <h2> {movie.title}</h2>
                  <Link href={"/movie/" + movie.id}>
                    <img
                      src={'https://image.tmdb.org/t/p/w235_and_h235_face' + movie.poster_path}
                    />
                  </Link>
                </div>;
              })
            }
        </div>
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