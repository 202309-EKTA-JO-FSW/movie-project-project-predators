import { getMovieCredits, getMovieDetails } from "@/util/API";
import React from "react";

async function SingleMoviePage(props) {
    const movieDetails = await getMovieDetails(props.id)
    const movieCredits = await getMovieCredits(props.id)
    const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
    return (
    <div className="all">
        <div className="image">
            <img src={`${IMAGE_BASE_URL}${movieDetails.backdrop_path}`} />
        </div>
        <div className="title">
            <h2>{movieDetails.original_title}</h2>
        </div>
        <div className="facts">
            <span className="date">{movieDetails.release_date}</span>
            <span className="genres">{movieDetails.genre_ids}</span>
            <spam className="language">{movieDetails.original_language} </spam>
        </div>
        <div className="vote">
            <p></p>

        </div>
        <div className="overview">
            <h3>Overview</h3>
            <h4>{movieDetails.overview}</h4>
        </div>
        <div className="cast">

        </div>
        
        
        
        <div className="cast">
            {movieCredits.map(actor => (
            <div key={actor.id}>
                <p>{actor.name} as {actor.character}</p>
            </div>
        ))}
        </div>  
    </div>
    )
}

export default SingleMoviePage