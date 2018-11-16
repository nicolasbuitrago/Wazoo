import React from 'react';
import { Redirect } from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import NavBar from '../NavBar';

class RestaurantPage extends React.Component {

    state = {  }

    render() { 
        
        return (
            <div>
                <NavBar/>
                <Grid>
                    <p>{this.props.properties.name}</p>
                </Grid>
            </div>
        );
    }
}

class Redirection extends React.Component {

    state = {  }

    render() { 
        
        return (
            <div>
                {this.props.location.state? this.props.location.state.fromDashboard? <RestaurantPage properties={this.props.location.state.props} /> : <Redirect to='/'/> : <Redirect to='/'/>}
            </div>
        );
    }
}
 
export default Redirection;