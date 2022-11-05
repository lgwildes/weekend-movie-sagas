import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {HashRouter as Router, Route, Link } from 'react-router-dom';
import './MovieList.css'


function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'}); //these will be intercepted by rootSaga
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return ( // each poster/title links to a details page with that movie's ID in the url
                        <div key={movie.id} > 
                            <Link to={{pathname: `/details/${movie.id}`}}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                            </Link>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;