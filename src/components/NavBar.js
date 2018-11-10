import React from 'react'

import './NavBar.css'; // Imported css

class navBar extends React.Component {

  render() {
    return (
    <div className='navBar'>
        <img src="imgs/wazoo.png" alt="Wazoo" height="50" width="50"/>
        <h1>Wazoo</h1>
    </div>
    );
  }
}

export default navBar;