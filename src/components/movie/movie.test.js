import { render, screen, within } from '@testing-library/react';
import Movie from './movie';
import dbJson from '../../../db.json';

describe('Movie', () => {
  let movieJson = null;

  beforeEach(() => {
    movieJson = dbJson.movie[0];
  })

  test('should display the correct title', () => {
    render(<Movie details={movieJson} />);

    const title = screen.getByText(movieJson.title);

    expect(title).toBeInTheDocument();
  });

  it ('should display the correct description', () => {
    render(<Movie details={movieJson} />);

    const description = screen.getByText(movieJson.description);

    expect(description).toBeInTheDocument();
  });


  it ('should display the correct directors', () => {
    render(<Movie details={movieJson} />);

    const directors = within(screen.getByTestId('directors')).getByText(movieJson.directors.join(', '));

    expect(directors).toBeInTheDocument();
  });

  it ('should display the correct writers', () => {
    render(<Movie details={movieJson} />);

    const writers = within(screen.getByTestId('writers')).getByText(movieJson.writers.join(', '));

    expect(writers).toBeInTheDocument();
  });

  it ('should display the correct stars', () => {
    render(<Movie details={movieJson} />);

    const starsText = movieJson.stars.reduce((acc, star, index) => {
      const showComma = index !== movieJson.stars.length - 1;
      return acc +
        `${star.actor} (${star.character})` +
        (showComma ? ', ' : '');
    }, '');

    const stars = within(screen.getByTestId('stars')).getByText(starsText);

    expect(stars).toBeInTheDocument();
  });

  test('should should directors (plural) if multiple director and vice versa', () => {
    let updatedMovie = {
      ...movieJson,
      directors: ['Christopher Nolan']
    }

    render(<Movie details={updatedMovie} />);

    expect(screen.getByText('Director:')).toBeInTheDocument();

    updatedMovie = {
      ...movieJson,
      directors: ['Christopher Nolan', 'Lana Wachowski']
    }

    render(<Movie details={updatedMovie} />);

    expect(screen.getByText('Directors:')).toBeInTheDocument();
  });

  test('should should writers (plural) if multiple director and vice versa', () => {
    let updatedMovie = {
      ...movieJson,
      writers: ['Christopher Nolan']
    }

    render(<Movie details={updatedMovie} />);

    expect(screen.getByText('Writer:')).toBeInTheDocument();

    updatedMovie = {
      ...movieJson,
      writers: ['Christopher Nolan', 'Lana Wachowski']
    }

    render(<Movie details={updatedMovie} />);

    expect(screen.getByText('Writers:')).toBeInTheDocument();
  });

  test('should should stars (plural) if multiple director and vice versa', () => {
    let updatedMovie = {
      ...movieJson,
      stars: [
        {
          actor: 'Christian Bale',
          character: 'Batman'
        }
      ]
    }

    render(<Movie details={updatedMovie} />);

    expect(screen.getByText('Star:')).toBeInTheDocument();

    updatedMovie = {
      ...movieJson,
      stars: [
        {
          actor: 'Christian Bale',
          character: 'Batman'
        },
        {
          actor: 'Michael Caine',
          character: 'Alfred'
      },
      ]
    }

    render(<Movie details={updatedMovie} />);

    expect(screen.getByText('Stars:')).toBeInTheDocument();
  });
})