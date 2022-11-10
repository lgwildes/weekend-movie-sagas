import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, Card, CardContent, Container, Grid, FormControl, TextField, TextareaAutosize, Select, MenuItem, InputLabel, Box } from "@material-ui/core";
import './MovieForm.css'
function MovieForm() {

    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' }); //these will be intercepted by rootSaga
    }, []);

    const genres = useSelector(store => store.genres)


    function handleSubmit(evt) {
        evt.preventDefault();
        console.log('adding moving ', title);
        const newMovie = {
            title: title,
            poster: poster,
            description: description,
            genre_id: genre
        }


        dispatch({
            type: 'CREATE_MOVIE',
            payload: newMovie
        })


    }


    if (genres) {
        return (
            <>
                <div>
                    <Button // button returns user to homepage List of movies
                        className="button my-super-special-btn"
                        variant="contained"
                        onClick={() => { history.push('/') }} >Back to Collection
                    </Button>

                    <Container maxWidth="sm"  >
                        <Box>
                        <Card  >
                            <CardContent >

                                <form onSubmit={handleSubmit}
                                    className="form">
                                    <FormControl >
                                        <TextField
                                            onChange={(event) => setTitle(event.target.value)}
                                            variant="outlined"
                                            type="text"
                                            placeholder="film title" />

                                        <TextField onChange={(event) => setPoster(event.target.value)}
                                            variant="outlined"
                                            type="text"
                                            placeholder="poster url" />

                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="movie description"
                                            multiline
                                            onChange={(event) => setDescription(event.target.value)}
                                        />

                                        {/* <InputLabel id="genres" htmlFor="genres">select genres</InputLabel> */}
                                        <Select onChange={(event) => setGenre(event.target.value)}
                                            labelId="genres"
                                            id="genres"
                                            name="genres"
                                            value={genre}>
                                                
                                            {genres && genres.map(genre => (
                                                <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                                            ))}
                                        </Select>


                                        <Button
                                            variant="contained"
                                            type='submit'>
                                            save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => { history.push('/') }}>
                                            cancel
                                        </Button>
                                    </FormControl>
                                </form>

                            </CardContent>
                        </Card>
                        </Box>
                    </Container>
                </div>
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