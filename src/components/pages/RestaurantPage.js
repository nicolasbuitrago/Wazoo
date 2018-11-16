import React from 'react';
import { Redirect } from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import NavBar from '../NavBar';

class RestaurantPage extends React.Component {
    state = {  }
    render() { 
        return (
            <div>
                {this.props.location.state? this.props.location.state.fromDashboard? <NavBar/> : <Redirect to='/'/> : <Redirect to='/'/>}
                <Grid>
                HELLO WORLD
                </Grid>
            </div>
         );
    }
}
 
export default RestaurantPage;