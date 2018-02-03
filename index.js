 


      var map;
      var infowindow;

// loads the map having Rochester NY coordinates in the center
      function initMap() {
        var Rochester = {lat: 43.1563, lng: -77.5976};

        map = new google.maps.Map(document.getElementById('map'), {
          center: Rochester,
          zoom: 11
        });
// queries the craft breweries in Rochester
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: Rochester,
          radius: 5000,
          query: 'craft breweries in Rochester NY'
        }, callback);
      }


      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name + ' // Rating: ' + place.rating + ' out of 5 ' + ' // Address: ' + place.formatted_address);
          infowindow.open(map, this);
        });
      }
 