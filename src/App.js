import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

var stores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Los Compadres",
        "phoneFormatted": "(202) 234-7336",
        "phone": "2022347336",
        "address": "1471 P St NW",
        "city": "Barranquilla",
        "country": "Colombia",
        "crossStreet": "at 15th St NW",
        "state": "Atlantico"
      },
      "geometry": {
        "coordinates": [
          -74.807273,
          10.995935
        ],
        "type": "Point"
      },
      "id": "0d5fc1a263973dba18db924c680659fa"
    },
    {
      "type": "Feature",
      "properties": {
        "name": "La terraza",
        "phoneFormatted": "(202) 234-7336",
        "phone": "2022347336",
        "address": "1471 P St NW",
        "city": "Barranquilla",
        "country": "Colombia",
        "crossStreet": "at 15th St NW",
        "state": "Atlantico"
      },
      "geometry": {
        "coordinates": [
          -74.811328,
          10.994313
        ],
        "type": "Point"
      },
      "id": "69ae4beb54d1d79b369551ba3b17737b"
    }
  ]
}

class App extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: -74.8022,
      lat: 10.9973,
      zoom: 13.02
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('load', function(e) {
      // Add the data to your map as a layer
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: stores
        },
        layout: {
          'icon-image': 'restaurant-15',
          'icon-allow-overlap': true,
        }
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

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

export default App;
