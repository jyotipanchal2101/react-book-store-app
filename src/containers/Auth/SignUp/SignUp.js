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
};

export class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 emailValidation(){
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!this.state.email || regex.test(this.state.email) === false){
        this.setState({
            error: "Email is not valid"
        });
        return false;
    }
    return true;
}
  onSubmit = (event) => {
    event.preventDefault();

    if(this.emailValidation()){
    const { firstname, lastname, email, password, usertype } = this.state;
    const user = {
      firstname,
      lastname,
      email,
      password,
      usertype,
    };
    this.props.onRegister(user);
  }
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (e, { usertype }) => {
    this.setState({ usertype });
  };

  render() {
    const { firstname, lastname, email, password, value, error } =
      this.state;
    const isInvalid =
      firstname == "" || lastname == "" || email === "" || password === "";
    let authRedirectPath = null;
    if (this.props.isLoginSuccess) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
    const { formInput, radioButton, errorProp } = this.props;
    console.log("errorprop", this.props.errorProp);

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
              {error ? <p style={{ color: "red", fontSize: 13 }}>{error}</p> : errorProp==="The email address is already in use by another account." ?  <p style={{ color: "red", fontSize: 13 }}>{errorProp}</p> : ""}

             {formInput({name:'password',
                type:"password",
                label:"Password",
                value:password,
                placeholder:'password',
                onChange:this.onChange})}
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
            {/* <SignInLink/> */}
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
