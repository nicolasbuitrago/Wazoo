import React from 'react'
import rests from '../restaurants'

class Restaurant extends React.Component {
    render() {
        return (
        <div id={'item-'+this.props.id} className='item'>
            <a href='#' className='title'>{this.props.name}</a>
        </div>
        );
    }
}

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: rests.features
        };
    }

    createList(){
        var data = this.state.restaurants;
        let list = [];
        // Iterate through the list of stores
        for (var i = 0; i < data.length; i++) {
            var currentFeature = data[i];
            // Shorten data.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = currentFeature.properties;

            list.push(<Restaurant id={i} name={prop.name}></Restaurant>);
        }
        return list;
    }

  render() {
    return (
    <div class='sidebar'>
        <div class='heading'>
            <h1>Restaurantes</h1>
        </div>
        <div id='listings' class='listings'>{this.createList()}</div>
    </div>
    );
  }
}

export default List;

function buildLocationList(data) {
    // Iterate through the list of stores
    for (var i = 0; i < data.features.length; i++) {
      var currentFeature = data.features[i];
      // Shorten data.feature.properties to just `prop` so we're not
      // writing this long form over and over again.
      var prop = currentFeature.properties;
      // Select the listing container in the HTML and append a div
      // with the class 'item' for each store
      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = 'listing-' + i;
  
      // Create a new link with the class 'title' for each store
      // and fill it with the store address
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.address;
  
      // Create a new div with the class 'details' for each store
      // and fill it with the city and phone number
      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.city;
      if (prop.phone) {
        details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      }
    }
  }
  
  