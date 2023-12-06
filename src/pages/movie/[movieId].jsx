import React, { useState, useEffect } from 'react';
import { getMovieCredits, getMovieDetails, getMovieRelease, getProduction, getRelatedMovies, getRuntime, getTrailer } from "@/util/API"
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Movie() {
  const router = useRouter();
  const { movieId } = router.query;
  const [data, setData] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null)
  const [rt, setRunTime] = useState(null)
  const [credit, setCredits] = useState(null)
  const [related, setRelated] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [prod, setProduction] = useState(null)
  const [loading, setLoading] = useState(true);
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

  useEffect(() => {
    if (movieId) {
      fetchData();
    }
  }, [movieId]);
  
  const setMovie = async (movieId) => {
    try {
      const result = await getMovieDetails(movieId);
      const releaseDetails = await getMovieRelease(movieId)
      const rt = await getRuntime(movieId)
      const credit = await getMovieCredits(movieId)
      const related = await getRelatedMovies(movieId)
      const trailer = await getTrailer(movieId)
      const prod = await getProduction(movieId)
      
      setData(result)
      setReleaseDate(releaseDetails)
      setRunTime(rt)
      setCredits(credit)
      setRelated(related)
      setTrailer(trailer)
      setProduction(prod)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await setMovie(movieId);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateYear = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    return `${year}`;
  };



// console.log(releaseDate)
// console.log(rt)
// console.log(credit)
// console.log(related)
// console.log(trailer)
  return (
    <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="all">
        <div className="movieimage">
          <img src={`${IMAGE_BASE_URL}${data?.poster_path}`} />
        </div>
        <div className="title">
          <h2>{data?.original_title} ({formatDateYear(releaseDate?.release_dates[0]?.release_date)})</h2>
        </div>
        <div className="facts">
          <div style={{ border: '2px solid black', padding: '10px', display: 'inline-block' }}>
            {releaseDate?.release_dates[0]?.certification && (
              <span className="date">{releaseDate.release_dates[0].certification}</span>
            )}
          </div>
          {releaseDate?.release_dates[0]?.release_date && (
            <span className="date">{formatDate(releaseDate.release_dates[0].release_date)}</span>
          )}
          {data?.genre_ids && <span className="genres">{data.genre_ids}</span>}
          {data?.original_language && <span className="language">{data.original_language.toUpperCase()}</span>}
          {rt && <span className="runtime">{rt}</span>}
                </div>
                <div className="vote">
                <span className="average">User Score: {data?.vote_average ? `${(data.vote_average * 10).toFixed(1)}%` : 'N/A'}</span>
                <span className="count"> ({data?.vote_count} Ratings)</span>
                </div>
                <div className="overview">
                    <h3>Overview</h3>
                    <h4>{data?.overview}</h4>
                </div>

                <div className="crew"> Directors:
                  <div className="directors">
                  {credit?.crew
                  .filter((crewMember) => crewMember.job === "Director").slice(0, 2).map((director, index, array) => (
                    <div key={director.id} className='director'>
                      <b>{director.name}</b>
                    </div>
                  ))}
                  </div>
                </div>
                <div className="cast">
                  <h3>Cast</h3>
                  <div className="actors">
                    {credit?.cast.slice(0, 5).map((actor, index) => (
                      <div key={actor.id} className='actor'>
                        <Link href={`/person/${actor.id}`}>
                      <img src={`${IMAGE_BASE_URL}${actor.profile_path}`} alt={`${actor.name}`} />
                      <b>{actor.name}</b> as {actor.character}
                      </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="media">
          <h3>Trailer</h3>
          {trailer?.map((video) => (
            <div key={video.id}>
              {video.type === "Trailer" && (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={`${video.name} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
          {prod && prod.logo_path && prod.provider_name && (
            <div className='production'>
              <span>Production Company:
                <img style={{ width: '15px', height: '15px'}}  src={`${IMAGE_BASE_URL}${prod.logo_path}`} alt={`${prod.provider_name}`} />
                <b> {prod.provider_name}</b>
              </span>
            </div>
          )}
        </div>

        <div className='related'>
          <h3>Related Movies</h3>
          <div className='rlmovie'>
            {related
              ?.filter((movie) => movie.backdrop_path) // Filter out movies without a backdrop_path
              .slice(0, 5)
              .map((rlmovie, index, array) => (
                <div key={rlmovie.id} className='related-item'>
                  <Link href={`/movie/${rlmovie.id}`}>
                    <img src={`${IMAGE_BASE_URL}${rlmovie.backdrop_path}`} alt={`${rlmovie.original_title} profile`} />
                    <b>{rlmovie.original_title}</b>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
}