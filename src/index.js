import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css'; //importing fonts for MUI
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres); //intercepts dispatch and calls function
    yield takeEvery ('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery ('CREATE_MOVIE', createMovie);
}

function* createMovie(action) {
    try {
        console.log('NEW MOVIE action.payload is ', action.payload);
        const newMovie = yield axios.post('/api/movie', action.payload);
        
        
    } catch {
        console.log('POST newMovie error')
    }

}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchAllGenres() {
    // get all genres from the DB through genre.router GET request
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all genres:', genres.data);
        yield put({type: 'SET_GENRES', payload: genres.data})

    }
    catch {
        console.log('get all genres error');
    }
}

function* fetchMovieDetails(action) {
    // get all DETAILS for a specific movie
    try {
        const movieDetails = yield axios.get(`/api/genre/${action.payload}`);
        console.log('get all details for movie ', movieDetails.data);
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data})
        
        
    }
    catch {
        console.log('fetch genres for movie error')
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store genre(s) for specific movie on details page
const movieDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}



// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
       
        
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
