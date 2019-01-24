      let map;
      let infowindow;
// loads the map having Rochester NY coordinates in the center
      window.initMap = function(){
        let Rochester = {lat: 43.1563, lng: -77.5976};
          map = new google.maps.Map(document.getElementById('map'), {
            center: Rochester,
            zoom: 11
        });
// queries the craft breweries in Rochester
        infowindow = new google.maps.InfoWindow();
        let service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: Rochester,
          radius: 5000,
          query: 'breweries'
        }, callback);
      };
      

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
            console.log(results.length);
          }
        }
      }

      function createMarker(place) {
        let placeLoc = place.geometry.location;
        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating + ' out of 5' + '<br>' +
                'Address: ' + place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
// Weather API Request 
    $( document ).ready(function() {

      const api = 'https://api.openweathermap.org/data/2.5/weather?zip=14609,us&appid=0ef99b497547688a2ef307fb58ccfbb6';
      
      $.getJSON(api, function(data){
        //JSON call for open weather API 
          let fTemp;
          let weatherType = data.weather[0].description;
          let kelvin = data.main.temp;
          let city = data.name;
          fTemp = (kelvin*(9/5)-459.67);
          //fTemp = (kelvin*(9/5)-459.67).toFixed(1)+'°F';
          let myTrunc = Math.trunc( fTemp );
          
          let Rohrbach = 'At ' + (myTrunc) + '°F' + ' pay a visit to ' + '<a href="https://www.rohrbachs.com/" target="_blank">Rohrbach Brewing Company!</a>' + ' Cozy up with a pint and a fresh homemade brick oven pizza.';
          let Genesee = 'At ' + (myTrunc) + '°F' + ' The ' + '<a href="https://www.geneseebeer.com/brewhouse/" target="_blank">Genesee Brew House</a>' + ' is a MUST. Enjoy this weather with a pint on their gorgeous rooftop';
          let threeHeads = 'At ' + (myTrunc) + '°F' + ' Visit ' + '<a href="https://threeheadsbrewing.com/" target="_blank">Three Heads Brewing.</a>' + ' Check out their Beer Garden and patio that rivals any other in the city';
          let lock32 = 'At ' + (myTrunc) + '°F' + ' Visit ' + '<a href="https://lock32brew.com/" target="_blank">Lock 32 Brewing Co.</a>' + ' Share some of their fresh popped popcorn, grab a cold pint and relax.';
          let swiftWater = 'At ' + (myTrunc) + '°F' + ' Swing by ' + '<a href="https://swiftwaterbrewing.com/" target="_blank">Swiftwater Brewing Co.</a>' + ' You can enjoy a pint inside or out with their unique garage door leading to their patio';
          let RocBrewing = 'At ' + (myTrunc) + '°F' + ' Stop by ' + '<a href="https://rocbrewingco.com/" target="_blank">Roc Brewing Co.</a>' + ' Grab a pint of and head out to their patio, Cheers!';
          let lostBorough = 'At ' + (myTrunc) + '°F' + ' Check out ' + '<a href="http://www.lostboroughbrewing.com/index.html" target="_blank">The Lost Borough Brewing Co.</a>' + ' Sticky Lips BBQ is right next door. Grab a pint, some BBQ and relax while, Cheers!';

          $("#temp").html('Temp: ' + myTrunc + '°F');
          $("#city").html('City: ' + city + ', NY');
          $("#main").html('Conditions: ' + weatherType);

          if( fTemp > 70.0) {
            $("#brewery").html(Genesee);
            
          } else if(fTemp > 65.0){
            $("#brewery").html(RocBrewing);

          } else if(fTemp > 60.0){
            $("#brewery").html(threeHeads);

          } else if(fTemp > 50.0){
            $("#brewery").html(swiftWater);
          
          } else if(fTemp > 40.0){
            $("#brewery").html(lostBorough);

          } else if(fTemp > 25.0){
            $("#brewery").html(lock32);

          } else if (myTrunc > 1.0){
            $("#brewery").html(Rohrbach);
          }   
      });
    });
