import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link className='anchor' href="/">
          Home
        </Link>
        <Link className='anchor' href="/actors/actors">
          Actors
        </Link>
        <Link className='anchor' href="/movies/popular">
          Movies
        </Link>
      </nav>
    </header>
  );
}