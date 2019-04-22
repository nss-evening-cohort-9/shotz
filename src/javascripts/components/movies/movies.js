import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<div id=${movie.id} class="card movie col-3">`;
    domString += `<div class="card-header">${movie.name}</div>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${movie.genre}</h5>`;
    domString += `<h5 class="card-title">${movie.releaseDate}</h5>`;
    domString += `<h5 class="card-title">${movie.description}</h5>`;
    domString += `<p class="card-text">${movie.locations.length} Locations</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
