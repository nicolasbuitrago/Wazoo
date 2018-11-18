import React from 'react';
import {Card, Grid, Message} from 'semantic-ui-react';
import NavBar from '../NavBar';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {first: '', last: ''},
            email: '',
            address: ''
        };
    }

    componentWillMount = () => {
        var email = this.props.email;
        axios
            .post('/api/users/get', {email: email})
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    address: response.data.address
                });
            });
    };

    render() {
        return (
            <div>
                <NavBar/>
                <Grid
                    className="ui container"
                    textAlign='center'
                    style={{
                    height: '100%',
                    margin: '0px'
                }}
                    verticalAlign='middle'>
                    <Grid.Column
                        style={{
                        maxWidth: 450
                    }}>
                        <Card
                            className="fluid card"
                            image="https://semantic-ui.com/images/avatar2/large/matthew.png"
                            header={this.state.name.first + " " + this.state.name.last}
                            meta={this.state.email}
                            description={this.state.address}></Card>
                        <Message>
                            <a
                                style={{
                                color: 'green'
                            }}
                                href='/login'>Set a new password</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

AccountPage.propTypes = {
    email: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return {email: state.user.email};
}

export default connect(mapStateToProps, {})(AccountPage);
