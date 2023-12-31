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
  <div className='singlemovie'>
    {loading ? (
      <p>Working on it...</p>
    ) : (
      <div className="themovie">
        {/* Section 1 */}
        <div className="section1">
          <div className="movieimage">
            <img className='therealimg' src={`${IMAGE_BASE_URL}${data?.poster_path}`} />
          </div>
            <h2 className='title'>{data?.original_title} ({formatDateYear(releaseDate?.release_dates[0]?.release_date)})</h2>
            <div className='facts'>
              {releaseDate?.release_dates[0]?.certification && (
              <span className="certification">{releaseDate.release_dates[0].certification}</span>
            )}
            {releaseDate?.release_dates[0]?.release_date && (
              <span className="date">{formatDate(releaseDate.release_dates[0].release_date)}</span>
            )}
            {rt && <span className="runtime">{rt}</span>}
            {data?.original_language && <span className="language">{data.original_language.toUpperCase()}</span>}
            </div>
            <div className="vote">
            User Score<span className="average"> {data?.vote_average ? `${(data.vote_average * 10).toFixed(1)}%` : 'N/A'}</span>
                <span className="count"> ({data?.vote_count} Ratings)</span>
                </div>
            <h3 className='overview'>Overview</h3>
            <span className='overview1'>{data?.overview}</span>
          <div className="crew">
            <span className='job'>Directors:</span>
            <div className="directors">
              {credit?.crew
                .filter((crewMember) => crewMember.job === "Director")
                .slice(0, 2)
                .map((director, index, array) => (
                  <div key={director.id} className='director'>
                    <span>{director.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <h3 className='cast'>Cast</h3>
        <div className="section2">
              {credit?.cast.slice(0, 5).map((actor, index) => (
                <div key={actor.id} className='actor'>
                  <Link href={`/person/${actor.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <img src={`${IMAGE_BASE_URL}${actor.profile_path}`} alt={`${actor.name}`} />
                    <b>{actor.name}</b> as {actor.character}
                  </Link>
                </div>
              ))}
        </div>

{/* Section 3 */}
<h3 className='trailer'>Trailer</h3>

<div className={`section3 ${trailer && trailer.length === 1 ? 'centered-trailer' : ''}`}>
  <div className={`media ${trailer && trailer.length === 2 ? 'two-trailers' : ''}`}>
    {trailer?.map((video) => (
      <div key={video.id}>
        {video.type === "Trailer" && (
          <iframe
            src={`https://www.youtube.com/embed/${video.key}`}
            title={`${video.name} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    ))}
  </div>

  <div>
    {prod && prod.logo_path && prod.provider_name && (
      <div className='production'>
        <div className='company'>
          <img style={{ width: '1.9vw', height: '1.9vw' }} src={`${IMAGE_BASE_URL}${prod.logo_path}`} alt={`${prod.provider_name}`} />
          <b> {prod.provider_name}</b>
          <b>Production</b>
        </div>
      </div>
    )}
  </div>
</div>


        {/* Section 4 */}
        <h3 className='relatedt'>Related Movies</h3>
        <div className="section4">
              {related
                ?.filter((movie) => movie.poster_path)
                .slice(0, 5)
                .map((rlmovie, index, array) => (
                  <div key={rlmovie.id} className='related-item'>
                    <Link href={`/movie/${rlmovie.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                      <img src={`${IMAGE_BASE_URL}${rlmovie.poster_path}`} alt={`${rlmovie.original_title} profile`} />
                      <b>{rlmovie.original_title}</b>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
    )}
  </div>
);
                }