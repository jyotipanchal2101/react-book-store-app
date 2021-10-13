import React, { Component } from "react";
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { SignUpLink } from "../SignUp/SignUp";
import { Link, withRouter } from "react-router-dom";
// import * as ROUTES from '../../constants/routes';
import { loginUser } from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import formHoc from "../../../hoc/formHoc";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

export class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  emailValidation() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!this.state.email || regex.test(this.state.email) === false) {
      this.setState({
        error: "Email is not valid",
      });
      return false;
    }
    this.setState({
      error: "",
    });
    return true;
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (this.emailValidation()) {
      const { email, password } = this.state;
      const user = {
        email,
        password,
      };
      this.props.loginUser(user);
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    let authRedirectPath = null;
    if (this.props.userId) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
    const { errorProp } = this.props;
    console.log("this.props", this.props.formInput);
    const { formInput } = this.props;
    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Sign In
            </Header>
            <Form size="big">
              {formInput({
                name: "email",
                label: "Email Address",
                value: email,
                placeholder: "email address",
                onChange: this.onChange,
              })}
  
              {error ? (
                <p style={{ color: "red", fontSize: 13 }}>{error}</p>
              ) : errorProp ===
                "There is no user record corresponding to this identifier. The user may have been deleted." ? (
                <p style={{ color: "red", fontSize: 13 }}>Email not exists</p>
              ) : (
                ""
              )}
              {formInput({
                name: "password",
                type: "password",
                label: "Password",
                value: password,
                placeholder: "password",
                onChange: this.onChange,
              })}

              {errorProp &&
              errorProp ===
                "The password is invalid or the user does not have a password." ? (
                <p style={{ color: "red", fontSize: 13 }}>{errorProp}</p>
              ) : (
                ""
              )}
              {/* <Form.Input
                name='email'
                label="Email Address"
                value={email}
                placeholder='email address'
                onChange={(e) => this.onChange(e)} />
              {error && error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.' ?
                <p style={{ color: "red", fontSize: 13 }}>{error.message}</p> : ""} 
               {error ? <p style={{ color: "red", fontSize: 13 }}>{error}</p> : errorProp === "There is no user record corresponding to this identifier. The user may have been deleted." ? <p style={{ color: "red", fontSize: 13 }}>Email not exists</p> : ""}  */}

              {/* <Form.Input
                name='password'
                label="Password"
                value={password}
                type="password"
                placeholder='password'
                onChange={(e) => this.onChange(e)} />
              {errorProp && errorProp === 'The password is invalid or the user does not have a password.' ?
                <p style={{ color: "red", fontSize: 13 }}>{errorProp}</p> : ""} */}

              <Button
                primary
                disabled={isInvalid}
                control={Button}
                onClick={this.onSubmit}
              >
                Sign In
              </Button>
            </Form>
            {authRedirectPath}
            {/* <SignUpLink /> */}
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // userData: state.userReducer.users,
    // loading: state.userReducer.isLoading,
    errorProp: state.userReducer.error,
    loading: state.userReducer.loading,
    isLoginSuccess: state.userReducer.isLoginSuccess,
    redirectPath: state.userReducer.authRedirectPath,
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userinfo) => dispatch(loginUser(userinfo)),
  };
};

export default formHoc(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInFormBase))
);
