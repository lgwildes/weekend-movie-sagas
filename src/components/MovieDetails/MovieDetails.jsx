import { useHistory } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieDetails() {

    const history = useHistory();
    

    return (
        <>
        <button // button returns user to homepage List of movies
         onClick={() => {history.push('/')}} >Back to List
        </button>
        <h1>Details here!</h1>
            <h4>Title</h4>
            <h4>Poster</h4>
            <h4>Description</h4>
            <h5>Genres from Redux</h5>

        </>
    ) 

}

export default MovieDetails;