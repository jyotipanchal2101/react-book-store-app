import React, { Component } from "react";
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import formHoc from "../../../hoc/formHoc";

const initialFormObj={
  email: "",
  password: "",
}
const  initialFormErrors={
  email: [{required:false}, {email:false}],
  password: [{required:false}, {password:false}]
}

export class SignInFormBase extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    }
    this.props.smartElement.isDirty = false
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.props.data;
        const user = {
          email,
          password,
        };
        if(this.props.smartElement.isFormValid()) {
          this.props.loginUser(user);
        }
  };

  render() {
    const { errorProp, data, formErrors, smartElement } = this.props;

    let authRedirectPath = null;
    if (this.props.userId) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
    console.log("formErrors", formErrors)
    console.log("smartElement", smartElement.isDirty)

    return (
      <div className="sign-margin">
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Sign In
            </Header>
            <Form size="big">
              {smartElement.formInput({
                name: "email",
                label: "Email Address",
                value: data.email,
                error: smartElement.isDirty && formErrors.email && formErrors.email.length ? formErrors.email.some(r=>r["required"]) ? formErrors.email.some(r=>r["email"])? "" :"Invalid Email" : 'Email Required' : "",
                rules:["required","email"]
              })}
             
              {smartElement.formInput({
                name: "password",
                type: "password",
                label: "Password",
                value: data.password,
                error: smartElement.isDirty && formErrors.password && formErrors.password.length ? formErrors.password.some(r=>r["required"]) ? formErrors.password.some(r=>r["password"])? "" :"Invalid Password" : 'Password Required' : "",
                placeholder: "password",
                rules:["required","password"]

              })}

              <Button
                primary
              //  disabled={isInvalid}
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
export default (formHoc((connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInFormBase))), initialFormObj, initialFormErrors));