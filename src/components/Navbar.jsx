import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './Searchbar';
import Head from 'next/head'

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
              <Link href="/genres/action">Action</Link>
              <Link href="/genres/adventure">Adventure</Link>
              <Link href="/genres/animation">Animation</Link>
              <Link href="/genres/comedy">Comedy</Link>
              <Link href="/genres/crime">Crime</Link>
              <Link href="/genres/documentary">Documentary</Link>
              <Link href="/genres/drama">Drama</Link>
              <Link href="/genres/family">Family</Link>
              <Link href="/genres/fantasy">Fantasy</Link>
              <Link href="/genres/history">History</Link>
              <Link href="/genres/horror">Horror</Link>
              <Link href="/genres/music">Music</Link>
              <Link href="/genres/mystery">Mystery</Link>
              <Link href="/genres/romance">Romance</Link>
              <Link href="/genres/sciencefiction">Science Fiction</Link>
              <Link href="/genres/tvmovie">TV Movie</Link>
              <Link href="/genres/thriller">Thriller</Link>
              <Link href="/genres/war">War</Link>
              <Link href="/genres/western">Western</Link>
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
