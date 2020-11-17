import './movieList.css'

import Movie from '../movie/movie';

function MovieList ({ movies = []}) {
  return (
    <ul className="movie-list">
      {
        movies.map((movie) => {
          return (
            <li key={movie?.id} className="movie-list-item">
              <Movie details={movie} />
            </li>
          )
        })
      }
    </ul>
  )
}

export default MovieList;