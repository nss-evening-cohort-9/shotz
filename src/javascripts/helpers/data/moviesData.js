import axios from 'axios';

const getMoviesData = () => axios.get('../db/movies.json');

export default { getMoviesData };
