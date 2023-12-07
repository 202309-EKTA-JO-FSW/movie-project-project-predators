import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './Searchbar';
import Head from 'next/head';

export default function Navbar() {
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
  };

  const toggleGenresDropdown = () => {
    setShowGenresDropdown(!showGenresDropdown);
  };

  return (
    <div className='wholenav'>
      <div className='thenav'>
        <div className='logo'>
          <Link href='/'>
            <img className='logoimg' src="/video_1666819.png" alt="HDMA Logo" />
          </Link>
          <Link className='logotitle' href='/'>HDMA</Link>
        </div>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
          />
        </Head>
        <nav>
          <div
            className={`anchor ${showGenresDropdown ? 'active' : ''}`}
            onMouseEnter={toggleGenresDropdown}
            onMouseLeave={toggleGenresDropdown}
          >
            Genres
            {showGenresDropdown && (
              <div className='dropdown'>
                {/* Replace Link components with static spans */}
                <span>Action</span>
                <span>Adventure</span>
                <span>Animation</span>
                <span>Comedy</span>
                <span>Crime</span>
                <span>Documentary</span>
                <span>Drama</span>
                <span>Family</span>
                <span>Fantasy</span>
                <span>History</span>
                <span>Horror</span>
                <span>Music</span>
                <span>Mystery</span>
                <span>Romance</span>
                <span>Science Fiction</span>
                <span>TV Movie</span>
                <span>Thriller</span>
                <span>War</span>
                <span>Western</span>
              </div>
            )}
          </div>
          <div
            className={`anchor ${showMoviesDropdown ? 'active' : ''}`}
            onMouseEnter={toggleMoviesDropdown}
            onMouseLeave={toggleMoviesDropdown}
          >
            Movies
            {showMoviesDropdown && (
              <div className='dropdown'>
                <Link href="/movies/toprated">Top Rated</Link>
                <Link href="/movies/popular">Popular</Link>
                <Link href="/movies/nowplaying">Now Playing</Link>
                <Link href="/movies/upcoming">Upcoming</Link>
              </div>
            )}
          </div>
          <Link className='anchor' href="/tv">
            TV Shows
          </Link>
          <Link className='anchor' href="/actors/actors">
            Actors
          </Link>
          <div className='searchbar'>
            <SearchBar />
          </div>
        </nav>
      </div>
    </div>
  );
}
