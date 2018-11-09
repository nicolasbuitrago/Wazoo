import React from 'react'
import Map from './components/map'
import List from './components/list'

import './App.css'; // Imported css

class App extends React.Component {
  render() {
    return (
      <div>
        <List/>
        <Map/>
      </div>
    );
  }
}

export default App;
