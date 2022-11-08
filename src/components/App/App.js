import {HashRouter as Router, Route, } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import ActionAreaCard from '../MovieList/MovieList';

function App() {
  return (
    <div className="App">
  
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details/:id">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add-movie">
          <MovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
