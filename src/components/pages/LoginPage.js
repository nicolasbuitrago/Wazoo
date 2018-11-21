import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import LoginForm from "../forms/LoginForm";
import {login} from "../../actions/auth";
import {Grid, Image, Header} from 'semantic-ui-react';

class LoginPage extends React.Component {
    submit = data => this
        .props
        .login(data)
        .then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div>
            <Grid
                textAlign='center'
                style={{
                  height: '100%',
                  'margin-top': '8em'
                }}
                verticalAlign='middle'>
                <Header as='h2' color='green' textAlign='center'>
                    <Image src='/imgs/wazoo.png' style={{'margin-right':'10px'}}/>
                      Log-in now
                    <LoginForm submit={this.submit}/>
                </Header>
            </Grid>
             </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes
        .shape({push: PropTypes.func.isRequired})
        .isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
