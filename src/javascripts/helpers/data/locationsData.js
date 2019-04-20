import axios from 'axios';

const getLocationsData = () => axios.get('../db/locations.json');

export default { getLocationsData };
