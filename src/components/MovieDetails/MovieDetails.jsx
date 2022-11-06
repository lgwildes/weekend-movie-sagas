import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams(); //this is getting the params from my /details url
                                //get the movie with an id that matches the id in my params 
    const movie = useSelector(store => store.movies.find((movie) => movie.id == params.id));
    const genres = useSelector(store => store.movieGenres)
    

    useEffect( () => {
        // console.log('params is ', params.id);
        dispatch ({
            type: 'FETCH_GENRES_FOR_MOVIE',
            payload: movie.id
        })
    },[params.id]) 



    return (
        <>
        <button // button returns user to homepage List of movies
         onClick={() => {history.push('/')}} >Back to List
        </button>
        <h1>Details here!</h1>
            <h4>{movie.title}</h4> 
            <img src={movie.poster}/> 
            {genres.map( genre => (  //map and display each genre for movie
                <div key={genre.id}>
                <h5>{genre}</h5>
                </div>
            )
                
            )}
            <h4>{movie.description}</h4>
            

        </>
    ) 

}

export default MovieDetails;