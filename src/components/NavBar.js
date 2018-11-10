import React from 'react'

import './NavBar.css'; // Imported css

class navBar extends React.Component {

  render() {
    return (
    <div className='navBar'>
      <div className="home">
        <img src="imgs/wazoo.png" alt="Wazoo" height="50" width="50"/>
        <h1>Wazoo</h1>
      </div>
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
        <li id="login"><a href="#login">Login</a></li>
      </ul>
    </div>
    );
  }
}

export default navBar;