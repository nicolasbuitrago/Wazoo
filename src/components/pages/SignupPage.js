import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';
import {Grid, Header, Image} from 'semantic-ui-react';


class SignupPage extends React.Component {
    submit = data =>
      this.props.signup(data).then(() => this.props.history.push("/dashboard"));
  
    render() {
      return (
        <Grid textAlign='center' style={{height:'100%', margin:'30px'}} verticalAlign='middle'>
          <Header as='h2' color='green' textAlign='center'>
            <Image src='/imgs/wazoo.png' /> Sign-up now
          </Header>
          <Grid.Row>
          <Header color='green'><SignupForm submit={this.submit} /></Header>
          </Grid.Row>
        </Grid>  
      );
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
    push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
