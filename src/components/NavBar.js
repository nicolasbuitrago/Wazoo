import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';

import './NavBar.css';

const NavBar = ({ isAuthenticated, logout }) => (
  <Menu secondary pointing>
    <Menu.Item className='logo'>
      <Image size='mini' src='./imgs/wazoo.png' />
    </Menu.Item>
    <Menu.Item header>Wazoo</Menu.Item>
    <Menu.Item name='home' as={Link} to='/' />
    <Menu.Item
      as={Link} to='/dashboard' 
      name='dashboard'
    />
    <Menu.Item
      as={Link} to='/account' 
      name='cuenta'
    />
    <Menu.Item className="right logout" onClick={() => logout()}>
      {/* <Button basic color='red' size='tiny'>Log out</Button> */}
      Log out
    </Menu.Item>
    {/* <Menu.Menu position='right' size='mini'>
      {isAuthenticated?(
        <Menu.Item>
          <Button basic color='red'>Log out</Button>
        </Menu.Item>
      ):(
        <Menu.Item>
          <Button basic color='green'>Log in</Button>
        </Menu.Item>
      )}
    </Menu.Menu> */}
  </Menu>
);

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(NavBar);