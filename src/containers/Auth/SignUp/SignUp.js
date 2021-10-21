import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { registerUser } from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import formHoc from '../../../hoc/formHoc';

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  usertype: "",
  error: null,
  errors:{}
};

export class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    let errorObj = this.props.validation(this.state.email, this.state.password)
    if (Object.keys(errorObj).length === 0) {
      const { firstname, lastname, email, password, usertype } = this.state;
      const user = {
        firstname,
        lastname,
        email,
        password,
        usertype,
      };
      this.props.onRegister(user);
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
  handleChange = (e, { usertype }) => {
    this.setState({ usertype });
  };

  render() {
    const { firstname, lastname, email, password, errors } =
      this.state;
    const isInvalid =
      firstname == "" || lastname == "" || email === "" || password === "";
    let authRedirectPath = null;
    if (this.props.isLoginSuccess) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
    const { formInput, radioButton, errorProp } = this.props;

    return (
      <div className="sign-margin">
        {authRedirectPath}
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Sign Up
            </Header>
            <Form size="big">
            {formInput({name:'firstname',
                label:"First Name",
                value:firstname,
                placeholder:'firstname',
                onChange:this.onChange})}

            {formInput({name:'lastname',
                label:"Last Name",
                value:lastname,
                placeholder:'lastname',
                onChange:this.onChange})}

             {formInput({name:'email',
                label:"Email Address",
                value:email,
                placeholder:'email',
                onChange:this.onChange})}

              {errors.email ? (
                <p style={{ color: "red", fontSize: 13 }}>{errors.email}</p>
              ) : errorProp === "The email address is already in use by another account." ? (
                <p style={{ color: "red", fontSize: 13 }}>{errorProp}</p>
              ) : (
                ""
              )}
             {formInput({name:'password',
                type:"password",
                label:"Password",
                value:password,
                placeholder:'password',
                onChange:this.onChange})}

               {errors.password ? (
                <p style={{ color: "red", fontSize: 13 }}>{errors.password}</p>
              ) : (
                ""
              )}


              <Form.Field>
                {radioButton({ label:"seller",
                  name:"radioGroup",
                  value:"seller",
                  usertype:"seller",
                  checked:this.state.usertype === "seller",
                  onChange:this.handleChange
                  })}
              </Form.Field>
              <Form.Field>
              {radioButton({ label:"customer",
                  name:"radioGroup",
                  value:"customer",
                  usertype:"customer",
                  checked:this.state.usertype === "customer",
                  onChange:this.handleChange
                  })}
              </Form.Field>
              <Button
                primary
                disabled={isInvalid}
                control={Button}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </Form>
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (userinfo) => dispatch(registerUser(userinfo)),
  };
};

export default formHoc(connect(mapStateToProps, mapDispatchToProps)(SignUpFormBase));
