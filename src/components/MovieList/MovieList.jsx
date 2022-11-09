import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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


function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'}); //these will be intercepted by rootSaga
    }, []);

    return (
        <main>
            <h1>My Film Collection</h1>
                <Link to="/add-movie" className='link'>Add Film</Link>
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

{/* <section className="movies">
{movies.map(movie => {
    return ( */}
{/* <div key={movie.id} > 
<Link to={{pathname: `/details/${movie.id}`}}>
<h3>{movie.title}</h3>
<img src={movie.poster} alt={movie.title}/>
</Link>
</div> */}
// })}
// </section>

export default MovieList;

