import React, { Component } from 'react';
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { SignUpLink } from '../SignUp/SignUp';
import { Link, withRouter } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
import {
  loginUser
} from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

export class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
      this.props.loginUser(user);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    let authRedirectPath = null;
    if (this.props.userId) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
    console.log('userType', this.props.usertype)
    return (
   
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as='h2'>Sign In</Header>
            <Form size='big'>
              <Form.Input
                name='email'
                label="Email Address"
                value={email}
                placeholder='email address'
                onChange={(e) => this.onChange(e)} />
              {error && error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.' ?
                <p style={{ color: "red", fontSize: 13 }}>{error.message}</p> : ""}
              <Form.Input
                name='password'
                label="Password"
                value={password}
                type="password"
                placeholder='password'
                onChange={(e) => this.onChange(e)} />
              {error && error.message == 'The password is invalid or the user does not have a password.' ?
                <p style={{ color: "red", fontSize: 13 }}>{error.message}</p> : ""}
              <Button primary disabled={isInvalid} control={Button} onClick={this.onSubmit}>Sign In</Button>
            </Form>
            {authRedirectPath}
      <SignUpLink />
          </Grid.Column>
        </Grid>
     </div>

    );
  }
}

const SignInLink = () => (
  <p>
    Already have an account? <Link to='/'>Sign In</Link>
  </p>
);


export { SignInLink };

const mapStateToProps = (state) => {
  console.log('state.userReducer.usertype', state.userReducer.usertype)
  return {
    // userData: state.userReducer.users,
    // loading: state.userReducer.isLoading,
    error: state.userReducer.error,
    loading: state.userReducer.loading,
    isLoginSuccess: state.userReducer.isLoginSuccess,
    redirectPath: state.userReducer.authRedirectPath,
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userinfo) => dispatch(loginUser(userinfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInFormBase));