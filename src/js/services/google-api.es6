var Promise = require('bluebird');

class GoogleApi {
  search(origin, destination) {
    return new Promise((resolve, reject) => {
      var directionsService = new google.maps.DirectionsService();
      var request = { origin, destination, travelMode: google.maps.TravelMode.TRANSIT };
      directionsService.route(request, (response, status) => {
        google.maps.DirectionsStatus.OK === status ? resolve(response) : reject(status);
      });
    });
  }
}

export default GoogleApi;
