import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const params = useParams();
    const movie = useSelector(store => store.movies.find((movie) => movie.id == params.id));
    

    useEffect( () => {
        // console.log('params is ', params.id);
        dispatch ({
            type: 'FETCH_GENRES_FOR_MOVIE',
            payload: movie.id
        })
    },[params.id])

//    if (genres !== undefined) {
//     console.log('genres is', genres)
    

//    }

  

    return (
        <>
        <button // button returns user to homepage List of movies
         onClick={() => {history.push('/')}} >Back to List
        </button>
        <h1>Details here!</h1>
            <h4>{movie.title}</h4>
            <h4>Poster</h4>
            <h4>{movie.description}</h4>
            <h5>Genres from Redux</h5>

        </>
    ) 

}

export default MovieDetails;