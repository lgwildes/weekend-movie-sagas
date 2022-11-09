import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Button } from "@material-ui/core";

function MovieForm() {
    const dispatch = useDispatch();
    const history = useHistory();
   
  
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'}); //these will be intercepted by rootSaga
    }, []);

    const genres = useSelector(store => store.genres)
    const addMovie = dispatch({type: 'ADD_MOVIE'})
    
    if(genres){
        return (
            <>
            <Button // button returns user to homepage List of movies
                className="button my-super-special-btn"
                variant="contained"
                onClick={() => {history.push('/')}} >Back to Collection
            </Button>
        
            <form onSubmit={addMovie}>
                <input type="text" placeholder="film title"/>
                <input type="text" placeholder="poster url"/>
                <textarea type="text" placeholder="movie description"/>
                <label htmlFor="genres">select genres</label>
                    <select id="genres" name="genres">
                        { genres && genres.map( genre => (
                            <option value={genre.name}>{genre.name}</option>
                        ) )}
                    </select>
        
            </form>
        
            </>
        )
    }
    else {
        return (
            <h1>loading...</h1>
        )
    }


}

export default MovieForm;