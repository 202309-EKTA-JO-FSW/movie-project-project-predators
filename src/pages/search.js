import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSearch } from '@/util/API';
import Link from 'next/link';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ id: 1 });
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    async function fetchSearchResults() {
      if (q) {
        try {
          const searchResults = await getSearch(q, page.id);
          setResults(searchResults);
        } catch (error) {
          console.error('Error fetching data:', error);
          return [];
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSearchResults();
  }, [q, page]);

  const getTitle = (result) => {
    if (result.media_type === 'movie') {
      return result.title || result.original_title || 'Untitled Movie';
    } else if (result.media_type === 'tv') {
      return result.name || 'Untitled TV Show';
    } else if (result.media_type === 'person') {
      return result.name || result.original_name || 'Unknown Person';
    }
    return 'Untitled';
  };

  const handleShowMoreClick = async () => {
    setLoading(true);
    const nextPageId = page.id + 1;
    const nextPage = { id: nextPageId };
    setPage(nextPage);
  };

  return (
    <div>
      <h2>Search Results for: {q}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <>
          <ul>
            {results.map((media) => (
              // Exclude results without a poster or profile image
              media.poster_path || media.profile_path ? (
                <li key={media.id} className='list'>
                  {getTitle(media)}
                  {media.media_type === 'person' && (
                    <span> (Actor)</span>
                  )}
                  <Link href={`/${media.media_type}/${media.id}`}>
                    <img
                      src={`${IMAGE_BASE_URL}${media.media_type === 'person' ? media.profile_path : media.poster_path}`}
                      alt={`${getTitle(media)} profile`}
                    />
                  </Link>
                </li>
              ) : null
            ))}
          </ul>
          <button className='button' onClick={handleShowMoreClick}>
            Show more
          </button>
        </>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
