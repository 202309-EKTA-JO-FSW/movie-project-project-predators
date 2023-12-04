import React, { useState, useEffect, useRef } from 'react';
import { getActors } from "@/util/API"
import Link from 'next/link';

export default function Actors() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ id: 1 });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const items = Array.from({ length: 500 }, (_, index) => ({ id: index + 1 }));

  const setActors = async (page) => {
    try {
      const result = await getActors(page.id);
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
    await setActors(selected);
  };

  const fetchData = async () => {
    await setActors({ id: 1 });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id='main'>
      {page && (
        <div>
          <h3> Page number: {page.id ?? 1}</h3>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="actorsList">
          {data.map((actor) => (
            <li key={actor.id}>
              <Link href={"/actor/" + actor.id}>
                <img src={'https://image.tmdb.org/t/p/w235_and_h235_face' + actor.profile_path} alt={actor.name} />
              </Link>
              <h2>{actor.name}</h2>
            </li>
          ))}
        </ul>
      )}
      <h2>Pages:</h2>
      <div ref={dropdownRef} className='dropdownContainer'>
        <div
          onClick={toggleDropdown}
          className='selectedOption'
        >
          {page.id}
        </div>
        {showDropdown && (
          <ul className='dropdownList'>
            {items.map((item) => (
              <li key={item.id} onClick={() => handleSelectChange({ target: { value: item.id } })}>
                {item.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}