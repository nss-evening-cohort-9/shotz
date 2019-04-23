import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  locations.forEach((location) => {
    domString += `<div id=${location.id} class="card location col-2">`;
    domString += `<div class="card-header">${location.name}</div>`;
    domString += '<div class="card-body">';
    domString += `<img class="card-img-top" src="${location.imageUrl}" alt="${location.name}">`;
    domString += `<h5 class="card-title">${location.address}</h5>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locations = locationResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
