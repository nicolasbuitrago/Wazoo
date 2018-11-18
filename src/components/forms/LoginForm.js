import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Grid, Input, Icon } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data,
        [e.target.name]: e.target.value
      }
  });

  onSubmit = () => {
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

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "You must enter a password";
    return errors;
  }

  render() {
      const {
        data,
        errors,
        loading
      } = this.state;
    
      return (
          <Grid textAlign='center' style={{height:'100%'}} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size='large' onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                  <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                  </Message>
                )}
                <Form.Field error={!!errors.email}>
                <Icon name={'user'}/>E-mail address
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Type your e-mail address"
                    value={data.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <InlineError text={errors.email} />}
                </Form.Field>

                <Form.Field error={!!errors.password}>
                  <Icon name={'key'}/>Password
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    value={data.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button color='green' fluid size='large'>Login</Button>
                <Message>
                  New to us? <a style={{color:'green'}} href='/signup'>Sign Up</a>
                </Message>
              </Form>
            </Grid.Column>
          </Grid>
        );
      }
    }

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
 
export default LoginForm;
