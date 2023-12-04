import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        Home
      </Link>
      {' | '}
      <Link href="/actors/actors">
        Actors
      </Link>
      {' | '}
      <Link href="/movies">
        movies
      </Link>
      {' | '}
      <Link href="/movies-list/movies-list">
        movies-list
      </Link>
    </nav>
  );
}