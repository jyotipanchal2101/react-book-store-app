import React, { Component } from "react";
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import formHoc from "../../../hoc/formHoc";
import onChangeHoc from "../../../hoc/onChangeHoc";
import { compose } from 'redux';

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  errors:{}
};

export class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    let errorObj = this.props.validation(this.props.data.email, this.props.data.password)
  if (Object.keys(errorObj).length === 0) {
      const { email, password } = this.props.data;
      const user = {
        email,
        password,
      };
      this.props.loginUser(user);
      this.setState({
        errors:{}
       })
    } else {
      this.setState({
        errors:errorObj
       })
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {  errors } = this.state;
    const { errorProp, formInput, handleChange, data } = this.props;

    const isInvalid =  data.email === "" || data.password === "";

    let authRedirectPath = null;
    if (this.props.userId) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
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
                value: data.email,
                placeholder: "email address",
                onChange: handleChange,
              })}
  
              {errors.email ? (
                <p style={{ color: "red", fontSize: 13 }}>{errors.email}</p>
              ) : errorProp === "There is no user record corresponding to this identifier. The user may have been deleted."? (
                <p style={{ color: "red", fontSize: 13 }}>Email not exists</p>
              ) : (
                ""
              )}
              {formInput({
                name: "password",
                type: "password",
                label: "Password",
                value: data.password,
                placeholder: "password",
                onChange: handleChange,
              })}

          {errors.password ? (
                <p style={{ color: "red", fontSize: 13 }}>{errors.password}</p>
              ) : errorProp === "The password is invalid or the user does not have a password."? (
                <p style={{ color: "red", fontSize: 13 }}>{errorProp}</p>
              ) : (
                ""
              )}

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

export default compose(formHoc, onChangeHoc)(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInFormBase)));