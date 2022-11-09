import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from "@material-ui/core";

function MovieForm() {

    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();
   
  
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'}); //these will be intercepted by rootSaga
    }, []);

    const genres = useSelector(store => store.genres)
    const addMovie = dispatch(
        {type: 'ADD_MOVIE',
        payload: {
            title: title,
            poster: poster,
            description: description
        }
    })
    
    if(genres){
        return (
            <>
            <Button // button returns user to homepage List of movies
                className="button my-super-special-btn"
                variant="contained"
                onClick={() => {history.push('/')}} >Back to Collection
            </Button>
        
            <form onSubmit={handleSubmit}>
                <input onChange={(event) => setTitle(event.target.value)} 
                        type="text" placeholder="film title"/>
                <input onChange={(event) => setPoster(event.target.value)} 
                        type="text" placeholder="poster url"/>
                <textarea onChange={(event) => setDescription(event.target.value)}
                        type="text" placeholder="movie description"/>
                <label  onChange={(event) => setGenre({name: event.target.value})}
                        htmlFor="genres">select genres</label>
                    <select id="genres" name="genres">
                        { genres && genres.map( genre => (
                            <option key={genre.name} value={genre.name}>{genre.name}</option>
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