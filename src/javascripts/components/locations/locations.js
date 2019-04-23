import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilder = (locArray) => {
  let domString = '';
  locArray.forEach((location) => {
    domString += `<div id=${location.id} class="card location col-2">`;
    domString += `<div class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</div>`;
    domString += '<div class="card-body">';
    domString += `<img class="card-img-top" src="${location.imageUrl}" alt="${location.name}">`;
    domString += `<h5 class="card-title">${location.address}</h5>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const filterButtonEvent = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  switch (buttonId) {
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    case 'dark':
      domStringBuilder(darkLocations);
      break;
    default:
      domStringBuilder(locations);
  }
};

const filterByTextEvent = (e) => {
  const searchText = e.target.value;
  const searchLocations = locations.filter((x) => {
    const hasName = x.name.includes(searchText);
    const hasAddress = x.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilder(searchLocations);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locations = locationResults;
      domStringBuilder(locations);
      document.getElementById('dark').addEventListener('click', filterButtonEvent);
      document.getElementById('afternoon').addEventListener('click', filterButtonEvent);
      document.getElementById('evening').addEventListener('click', filterButtonEvent);
      document.getElementById('morning').addEventListener('click', filterButtonEvent);
      document.getElementById('all').addEventListener('click', filterButtonEvent);
      document.getElementById('search-input').addEventListener('keyup', filterByTextEvent);
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
