import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RestaurantRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated? <Component {...props} /> : <Redirect to='/'/>}/>
);

RestaurantRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(RestaurantRoute);