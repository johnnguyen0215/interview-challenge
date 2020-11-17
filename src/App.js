import MovieList from './components/movieList/movieList'
import './App.css';
import { Container, CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ApiService from './services/api';
import environment from './environment/environment';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const api = new ApiService(environment.apiUrl);

    const fetchData = async () => {
      const movies = await api.get(['movie']);

      if (mounted) {
        setMovies(movies);
        setIsLoading(false);
      }
    }

    fetchData();

    return () => { mounted = false };
  }, []);

  return (
    <Container>
      <div className="app-heading">
        <h1>Movies</h1>
      </div>
      {
        isLoading ?
          <div className="progress-container">
            <CircularProgress size={'4rem'} />
          </div>
        : <MovieList movies={movies}/>
      }
    </Container>
  );
}

export default App;
