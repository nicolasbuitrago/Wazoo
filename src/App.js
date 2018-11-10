import React from 'react'
import mapboxgl from 'mapbox-gl'
import List from './components/list'

import rests from './restaurants' 

import './App.css'; // Imported css

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: -74.8090,
      lat: 10.9950,
      zoom: 13.64
    };
  }

  // map = new mapboxgl.Map({
  //   container: this.mapContainer,
  //   style: 'mapbox://styles/mapbox/streets-v9',
  //   center: [this.state.lng, this.state.lat],
  //   zoom: this.state.zoom
  // })

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    var flyAndPopUp = this.flyAndPopUp;
    
    this.map = map;

    map.on('load', function(e) {
      // Add the data to your map as a layer
      map.addSource('places', {
        type: 'geojson',
        data: rests
      });

      rests.features.forEach(function(marker,i) {
        // Create a div element for the marker
        var el = document.createElement('div');
        // Add a class called 'marker' to each div
        el.className = 'marker';
        el.addEventListener('click', function(e) {
          var activeItem = document.getElementsByClassName('active');
          // 1. Fly to the point
          flyAndPopUp(marker);
          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          var listing = document.getElementById('listing-' + i);
          console.log(listing);
          listing.classList.add('active');
        });
        
        
        // By default the image for your custom marker will be anchored
        // by its center. Adjust the position accordingly
        // Create the custom markers, set their position, and add to map
        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

  }

  flyAndPopUp=(clickedPoint)=>{
    const map = this.map;
    // 1. Fly to the point
    map.flyTo({
      center: clickedPoint.geometry.coordinates,
      zoom: 15
    });
    // 2. Close all other popups and display popup for clicked store

    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it ReactDOM.unmountComponentAtNode(popUps[0]);
    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(clickedPoint.geometry.coordinates)
        .setHTML('<h3>'+clickedPoint.properties.name+'</h3>' +
          '<h4>' + clickedPoint.properties.address + '</h4>');
    popup.addTo(map);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }
    // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
    var selectedFeature = clickedPoint.properties.name;
    var selectedFeatureIndex;
    for (var i = 0; i < rests.features.length; i++) {
      if (rests.features[i].properties.name === selectedFeature) {
        selectedFeatureIndex = i;
      }
    }
    // Select the correct list item using the found index and add the active class
    var listing = document.getElementById('item-' + selectedFeatureIndex);
    listing.classList.add('active');
  }

  flyTo=(id)=>{
    var clickedPoint = rests.features[id];
    
    this.flyAndPopUp(clickedPoint);
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <List fly={this.flyTo}/>
        <div class='map pad2'>
          <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          </div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
      </div>
      
    );
  }
}

export default App;
