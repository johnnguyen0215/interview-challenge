import MovieList from './components/movieList/movieList'
import './App.css';
import { Container, CircularProgress } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import ApiService from './services/api';
import environment from './environment/environment';
import { Pagination } from '@material-ui/lab';

const MAX_RESULTS_PER_PAGE = 10;

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const api = useRef(new ApiService(environment.apiUrl));
  const totalMovies = useRef(null);

  const handlePageChange = async (event, value) => {
    if (value !== page) {
      setIsLoading(true);
      setPage(value);
    }
  };

  const fetchMovieResults = async (page) => {
    const response = await api.current.get(
      ['movie'], [`_page=${page}`, `_limit=${MAX_RESULTS_PER_PAGE}`]
    );

    if (!totalMovies.current) {
      totalMovies.current = response?.headers.get('X-Total-Count');
      console.log(totalMovies.current);
    }

    const movies = response?.data;

    return movies;
  }

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchMovieResults(page);

      setMovies(movies);
      setIsLoading(false);
    }

    fetchData();
  }, [page]);

  return (
    <Container className="app">
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
      {
        totalMovies?.current > MAX_RESULTS_PER_PAGE &&
        <Pagination
          color="primary"
          count={Math.ceil(totalMovies?.current / MAX_RESULTS_PER_PAGE)}
          defaultPage={1}
          page={page}
          onChange={handlePageChange}
          size="medium"
          showFirstButton
          showLastButton
        />
      }
    </Container>
  );
}

export default App;
