import { useHistory, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieDetails.css'
//import MUI elements
import Card from '@mui/material/Card';
import { Button } from "@material-ui/core";




function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams(); //this is getting the params from my /details url
                                //get the movie with an id that matches the id in my params 
    const movie = useSelector(store => store.movieDetails);

    useEffect( () => {
        // console.log('params is ', params.id);
        dispatch ({
            type: 'FETCH_MOVIE_DETAILS',
            payload: params.id
        })

       
    },[params.id]) 



    return (
        <div className="movie-item-container">

            <Button // button returns user to homepage List of movies
                className="button my-super-special-btn"
                variant="contained"
                onClick={() => {history.push('/')}} >Back to Collection
            </Button>
                {/* this sets some CSS parameters for each card element */}
                <Card sx={{ width: 500, m: 2, p:5, boxShadow: 3}}> 
                    <h1>{movie.title}</h1> 
                    <img src={movie.poster}/> 
                    <div className="genres">
                        {movie.genre && movie.genre.map( genre => (  //map and display each genre for movie
                            <div key={genre}>
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