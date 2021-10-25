import React, { Component } from "react";
import { Form, Button, Grid, Header, Radio } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { registerUser } from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import formHoc from '../../../hoc/formHoc';
import { withRouter } from "react-router-dom";

const INITIAL_STATE = {
  usertype: "",
  error: null,
  errors:{}
};
const initialFormObj={
  firstname: "",
  lastname: "",
  password: "",
  email: "",
}

const  initialFormErrors={
  email: [{required:false}, {email:false}],
  password: [{required:false}, {password:false}],
  firstname: [{required:false}, {firstname:false}],
  lastname: [{required:false}, {lastname:false}]

}
export class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password, usertype } = this.props.data;
    const user = {
      firstname,
      lastname,
      email,
      password,
      usertype,
    };
    if(this.props.smartElement.isFormValid()) {
    this.props.onRegister(user);
    }
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let authRedirectPath = null;
    if (this.props.isLoginSuccess) {
      authRedirectPath = <Redirect to={this.props.redirectPath} />;
    }
    const { errorProp, smartElement, data, formErrors } = this.props;
    return (
      <div className="sign-margin">
        {authRedirectPath}
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Header style={{ color: "#4183c4" }} as="h2">
              Sign Up
            </Header>
            <Form size="big">
            {smartElement.formInput({name:'firstname',
                label:"First Name",
                value:data.firstname,
                placeholder:'firstname',
                error: smartElement.isDirty && formErrors.firstname && formErrors.firstname.length ? formErrors.firstname.some(r=>r["required"]) ? formErrors.firstname.some(r=>r["email"])? "" :"Invalid Email" : 'First Name Required' : "",
                rules:["required","firstname"]
              })}

            {smartElement.formInput({name:'lastname',
                label:"Last Name",
                value:data.lastname,
                placeholder:'lastname',
                error: smartElement.isDirty && formErrors.lastname && formErrors.lastname.length ? formErrors.lastname.some(r=>r["required"]) ? formErrors.lastname.some(r=>r["email"])? "" :"Invalid Email" : 'Last Name Required' : "",
                rules:["required","lastname"]
                  })}

             {smartElement.formInput({name:'email',
                label:"Email Address",
                value:data.email,
                placeholder:'email',
                error: smartElement.isDirty && formErrors.email && formErrors.email.length ? formErrors.email.some(r=>r["required"]) ? formErrors.email.some(r=>r["email"])? "" :"Invalid Email" : 'Email Required' : errorProp && errorProp === "The email address is already in use by another account." ? errorProp : "",
                rules:["required","email"]
                })}

             {smartElement.formInput({name:'password',
                type:"password",
                label:"Password",
                value:data.password,
                placeholder:'password',
                error: smartElement.isDirty && formErrors.password && formErrors.password.length ? formErrors.password.some(r=>r["required"]) ? formErrors.password.some(r=>r["password"])? "" :"Invalid Password" : 'Password Required' : "",
                rules:["required","password"]
                })}

              <Form.Field>
                {smartElement.radioButton({ label:"seller",
                  name:"radioGroup",
                  value:"seller",
                  usertype:"seller",
                  checked:data.usertype === "seller",
                  })}
              </Form.Field>
              <Form.Field>
              {smartElement.radioButton({ label:"customer",
                  name:"radioGroup",
                  value:"customer",
                  usertype:"customer",
                  checked:data.usertype === "customer",
                  })}
              </Form.Field>
              <Button
                primary
              //  disabled={isInvalid}
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

export default (formHoc((connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpFormBase))), initialFormObj, initialFormErrors));