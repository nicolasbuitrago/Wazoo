import React from 'react';
// import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
// import PropTypes from 'prop-types';
//import {BrowserRouter, Route} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import List from './List';
// import { fetchRestaurants } from "../actions/restaurants";
import axios from 'axios';

//import rests from '../restaurants';

import './Map.css'; // Imported css

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: -74.8090,
      lat: 10.9950,
      zoom: 13.64,
      rests: {
        features: [],
        type: "FeatureCollection"
      },
      all:[],
      favs:[]
    };
  }

  markers = []

  componentWillMount = () => {
    axios.get('/api/restaurants').then(response => {
      this.setState({
        rests: {
          features: response.data.restaurants,
          type: "FeatureCollection"
        },
        all: response.data.restaurants
      });
      this.componentDidMount();
      const email = this.props.email;
      axios.post('/api/users/favorites',{ user:{ email:email } }).then(resp => {
        this.setState({
          favs: resp.data.favorites
        });
      }
      );
    }
    );

    // this.props.fetchRestaurants().then(response=> {
    //   console.log(response.data);
    //   this.setState({rests:{
    //     features: response.data,
    //     type: "FeatureCollection"
    //   }});
    // });
  }

  getRests=()=>{
    return this.state.rests.features;
  }

  setRests=(r)=>{
    var rests;
    switch(r){
      case 'all':
        rests = this.state.all;
        this.setState({
          rests: {...this.state.rests, features:this.state.all}
        });
        break;
      case 'favs':
        rests = this.state.favs;
        this.setState({
          rests: {...this.state.rests, features:this.state.favs}
        });
        break;
      default:
        console.log('ENTRO A DEFAULT EN MAP');
        break;
    }
    // var markers = document.getElementsByClassName('marker');
    this.setMarkers(rests)
  }

  setMarkers=(rests) => {
    this.markers.forEach(function(ma){
      ma.remove();
    });
    var markers = [];
    var map = this.map;
    // const { rests } = this.state;
    var flyAndPopUp = this.flyAndPopUp;
    rests.forEach(function(marker,i) {
      // Create a div element for the marker
      var el = document.createElement('div');
      // Add a class called 'marker' to each div
      el.className = 'marker';
      el.addEventListener('click', function(e) {
        // var activeItem = document.getElementsByClassName('active');
        // 1. Fly to the point
        flyAndPopUp(marker);
        // 3. Highlight listing in sidebar (and remove highlight for all other item)
        e.stopPropagation();
      });
      // By default the image for your custom marker will be anchored
      // by its center. Adjust the position accordingly
      // Create the custom markers, set their position, and add to map
      var m = new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      markers.push(m);
    });
    this.markers = markers;
  }

  componentDidMount() {
    const { lng, lat, zoom, rests } = this.state;
    // console.log(rests);
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    var flyAndPopUp = this.flyAndPopUp;
    
    this.map = map;

    var markers = [];

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
          // var activeItem = document.getElementsByClassName('active');
          // 1. Fly to the point
          flyAndPopUp(marker);
          // 3. Highlight listing in sidebar (and remove highlight for all other item)
          e.stopPropagation();
          // if (activeItem[0]) {
          //   activeItem[0].classList.remove('active');
          // }
          // var listing = document.getElementById('item-' + i);
          // listing.classList.add('active');
        });
        
        
        // By default the image for your custom marker will be anchored
        // by its center. Adjust the position accordingly
        // Create the custom markers, set their position, and add to map
        var m = new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
        markers.push(m);
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

    map.on('click', () => {
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      var popUps = document.getElementsByClassName('mapboxgl-popup');
      // Check if there is already a popup on the map and if so, remove it ReactDOM.unmountComponentAtNode(popUps[0]);
      if (popUps[0]) popUps[0].remove();
    });
    this.markers = markers;
  }

  flyAndPopUp=(clickedPoint)=>{
    const map = this.map;
    const {rests} = this.state;
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
        .setHTML('<h4>'+clickedPoint.properties.name+'</h4>' +
          '<h6>' + clickedPoint.properties.address + '</h6>');
    popup.addTo(map);
    // 3. Highlight listing in sidebar (and remove highlight for all other items)
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
    const {rests} = this.state;
    var clickedPoint = rests.features[id];
    
    this.flyAndPopUp(clickedPoint);
  }

  isFav = (id) => {
    var fav = false;
    this.state.favs.forEach(function(r){
      if(id === r._id){
        fav = true;
      }
    })
    return fav;
  }

  addFav = (id) => {
    const email = this.props.email;
    axios.post('/api/users/favorites/add',{  email:email, id:id }).then(resp => {
      this.setState({
        favs: resp.data.favorites
      });
    }
    );
  }

  removeFav = (id) => {
    const email = this.props.email;
    axios.post('/api/users/favorites/remove',{  email:email, id:id }).then(resp => {
      this.setState({
        favs: resp.data.favorites
      });
    }
    );
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <Grid>
        <div className="principal">
          <Grid.Column width={4}>
            <List 
              fly={this.flyTo} 
              setRests={this.setRests} 
              getRests={this.getRests} 
              isFav={this.isFav} 
              addFav={this.addFav} 
              removeFav={this.removeFav} 
              />
            </Grid.Column>
            <Grid.Column width={11}>
            <div className='pad2'>
              <div className="inline-block info mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
              </div>
              <div ref={el => this.mapContainer = el} className="map" />
            </div>
            </Grid.Column>
        </div>
      </Grid>
      
    );
  }
}

// Map.propTypes = {
//   fetchRestaurants: PropTypes.func.isRequired
// }

export default Map;
// export default connect(null, { fetchRestaurants })(Map);
