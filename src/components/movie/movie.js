import './movie.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Movie ({ details = {} }) {
  return (
    <Accordion className="movie" square={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span className="label">Title: </span>
        <span>{details.title}</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="details-container">
          <div className="movie-description">
            <span className="label">Description: </span>
            <span>{details.description}</span>
          </div>
          <div className="movie-directors" data-testid="directors">
            <span className="label">
              {details?.directors.length > 1 ? 'Directors': 'Director'}: </span>
            <span>{details?.directors.join(', ')}
            </span>
          </div>
          <div className="movie-writers" data-testid="writers">
            <span className="label">{details?.writers.length > 1 ? 'Writers': 'Writer'}: </span>
            <span>{details?.writers.join(', ')}</span>
          </div>
          <div className="movie-stars" data-testid="stars">
            <span className="label">{details?.stars.length > 1 ? 'Stars' : 'Star'}: </span>
            <span>
              {
                details?.stars.reduce((acc, star, index) => {
                  const showComma = index !== details?.stars.length - 1;
                  return acc +
                    `${star.actor} (${star.character})` +
                    (showComma ? ', ' : '');
                }, '')
              }
            </span>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default Movie;