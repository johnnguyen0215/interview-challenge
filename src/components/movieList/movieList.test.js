import { render, screen } from '@testing-library/react';
import MovieList from './movieList';
import dbJson from '../../../db.json';

describe('MovieList', () => {
  test('should render a movie list', () => {
    render(<MovieList movies={dbJson.movie} />)

    const movieListElement = screen.getByRole('list')

    expect(movieListElement).toBeInTheDocument();
  });

  test('should render appropriate number of movie elements', () => {
    render(<MovieList movies={dbJson.movie} />);

    const movies = screen.getAllByRole('listitem');

    expect(movies.length).toBe(dbJson.movie.length);
  });

  test('should not render any list items if no movies data is passed', () => {
    render(<MovieList />);

    expect(screen.queryByRole('listitem')).toBeNull();
  })
})