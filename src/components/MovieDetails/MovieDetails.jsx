import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieDetails.css'
//import MUI elements
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

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
        <div className="movie-item-container">

            <Button // button returns user to homepage List of movies
                className="button"
                variant="contained"
                onClick={() => {history.push('/')}} >Back to Collection
            </Button>
                <Card sx={{ width: 500, m: 2, p:5, boxShadow: 3}}>
                    <h1>{movie.title}</h1> 
                    <img src={movie.poster}/> 
                    <div className="genres">
                        {genres.map( genre => (  //map and display each genre for movie
                            <div key={genre.id}>
                            <h3>{genre}</h3>
                            </div>
                            )
                        )}
                    </div>
                
                    <p>{movie.description}</p>
                </Card>

        </div>
    ) 

}

export default MovieDetails;