import React from "react";
import PropTypes from "prop-types";
import { Grid, Form, Button, Message, Icon } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";


class SignupForm extends React.Component {
    state = {
        data: {
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            address:''
        },
        loading: false,
        errors: {}
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data,
                [e.target.name]: e.target.value
            }
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({
            errors
        });
        if (Object.keys(errors).length === 0) {
            this.setState({
                loading: true
            });
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({
                        errors: err.response.data.errors,
                        loading: false
                    })
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!isEmail(data.email)) errors.email = 'Invalid email';
        if (!data.password) errors.password = 'Invalid password';
        return errors;
    }

    submit = data =>
        this.props.signup(data).then(() => this.props.history.push("/dashboard"));
  
    render() {
        const { data, loading, errors } = this.state;
        return (
            <Grid textAlign='center' style={{height:'100%', width:'400px'}} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <Form size='large' onSubmit={this.onSubmit} loading={loading} >
                        {errors.global && (
                            <Message negative>
                                <Message.Header>Something went wrong</Message.Header>
                                <p>{errors.global}</p>
                            </Message>
                        )}
                        <Icon name={'address card'}/> First name
                        <Form.Field>                            
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={data.firstName}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Icon name={'address card'}/> Last name
                        <Form.Field>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={data.lastName}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Icon name={'user'}/> E-mail address
                        <Form.Field error={!!errors.email}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@example.com"
                                value={data.email}
                                onChange={this.onChange}
                            />
                            {errors.email && <InlineError text={errors.email} />}
                        </Form.Field>
                        <Icon name={'key'}/> Password
                        <Form.Field error={!!errors.password}>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={this.onChange}
                            />
                            {errors.password && <InlineError text={errors.password} />}
                        </Form.Field>
                        <Icon name={'building'}/> Address
                        <Form.Field>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={data.address}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Button color='green' fluid size='large'>Sign-up</Button>
                        <Message>
                            Already signed-up? <a style={{color:'green'}} href='/login'>Log-in</a>
                        </Message>
                    </Form>
                </Grid.Column>
            </Grid>
            
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;
