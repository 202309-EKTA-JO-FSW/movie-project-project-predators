import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './Searchbar';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <nav>
        <Link className='anchor' href="/">
          Home
        </Link>
        <Link className='anchor' href="/">
        Genres
        </Link>
        <div
          className={`anchor ${showDropdown ? 'active' : ''}`}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          Movies
          {showDropdown && (
            <div className='dropdown'>
              <Link href="/movies/toprated">Top Rated</Link>
              <Link href="/movies/popular">Popular</Link>
              <Link href="/movies/nowplaying">Now Playing</Link>
              <Link href="/movies/upcoming">Upcoming</Link>
            </div>
          )}
        </div>
        <Link className='anchor' href="/actors/actors">
          Actors
        </Link>
        <div className='searchbar'>
        <SearchBar />
        </div>
      </nav>
    </header>
  );
}
