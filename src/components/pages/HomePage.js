import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from "semantic-ui-react";
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated? (
      <Button basic color='red' onClick={() => logout()}>Logout</Button> 
    ) : (
      <div><Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link></div>
    )}
    <Button icon='heart' size='tiny'/>
    <Icon name='heart' color='red' />
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);