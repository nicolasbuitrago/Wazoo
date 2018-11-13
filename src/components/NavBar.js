import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';

const NavBar = ({ isAuthenticated, logout }) => (
  <Menu secondary pointing>
    <Menu.Item name='home' as={Link} to='/' />
    <Menu.Item
      name='restaurantes'
    />
    <Menu.Item
      name='cuenta'
    />
    <Menu.Menu position='right' size='mini'>
      {isAuthenticated?(
        <Menu.Item>
          <Button basic color='red'>Log out</Button>
        </Menu.Item>
      ):(
        <Menu.Item>
          <Button basic color='green'>Log in</Button>
        </Menu.Item>
      )}
    </Menu.Menu>
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