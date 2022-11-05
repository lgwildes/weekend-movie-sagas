const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM "genres"
                ORDER BY "name" ASC;`
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500)
    })
  
});

router.get('/:id', (req, res) => { //select all genres for given movie ID

  console.log('in router.get MOVIE GENREEEEEE 😠', req.params.id)
  const query = `  SELECT json_agg(name) AS genre 
                    FROM "genres"
                    LEFT JOIN movies_genres ON movies_genres.genre_id = genres.id
                    LEFT JOIN movies ON movies.id = movies_genres.movie_id
                    WHERE movies.id = $1
                    GROUP BY movies.title;`;

    pool.query(query, [req.params.id])
      .then( dbResult => {
        console.log('dbResult.rows is ', dbResult.rows)
        res.send(dbResult.rows[0].genre)
      })
      .catch( err => {
        console.log('error getting genre for movie', err)
        res.sendStatus(500);
      })


 
})

module.exports = router;