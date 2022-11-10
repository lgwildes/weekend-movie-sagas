import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import {HashRouter as Router, Route, Link } from 'react-router-dom';
import './MovieList.css'
//importing MUI things
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { shadows } from '@mui/system';
import { Button } from "@material-ui/core";


function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'}); //these will be intercepted by rootSaga
    }, []);

    return (
        <main>
            <h1>My Film Collection</h1>
                <Button // button returns user to homepage List of movies
                        className="button my-super-special-btn"
                        variant="contained"
                        onClick={() => { history.push('/add-movie') }} >Add Film
                </Button>
            <Grid container>

            <section className="movies">
                {movies.map(movie => {
                    return ( // each poster/title links to a details page with that movie's ID in the url
                 
                            <div  key={movie.id}>
                            <Link to={{pathname: `/details/${movie.id}`}}>
                                <Card sx={{ width: 230, m: 2, boxShadow: 3}}>
                                    <CardActionArea  >
                                        <CardMedia
                                            component="img"
                                            height="330"
                                            width="250"
                                            image={movie.poster}
                                            alt={movie.title}
                                        />
                                        <CardContent>
                                            <Typography 
                                                gutterBottom variant="p" 
                                                component="div">
                                            {movie.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                            </div>
            
                 
                      
                    );
                })}
            </section>
            </Grid>
        </main>

    );
}



export default MovieList;

