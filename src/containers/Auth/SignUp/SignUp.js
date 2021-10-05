import React, { Component } from 'react';
import { Form,Button,Grid,Header, Radio } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { SignInLink } from '../SignIn/SignIn';
import {
    registerUser,
  } from "../../../redux/actions/userAction";
  import { connect } from "react-redux";
  import { Redirect } from "react-router-dom";

const INITIAL_STATE = {
    firstname:'',
    lastname:'',
    password:'',
    email:'',
    usertype:'',
    error: null,
  };



export class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
}

onSubmit = event => {
    event.preventDefault();
    const { firstname, lastname, email, password, usertype } = this.state;
    const user = {
        firstname,
        lastname,
        email,
        password,
        usertype
      };
      this.props.onRegister(user);
    
}
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleChange = (e, { usertype }) =>{
        this.setState({ usertype })
      }

      render() {
        const { firstname, lastname,  email, password, usertype,  error, value} = this.state;
        const isInvalid = firstname=='' || lastname=='' || email === '' || password === '';
        let authRedirectPath = null;
        console.log('error', this.props.error)
        if (this.props.isLoginSuccess) {
          authRedirectPath = <Redirect to={this.props.redirectPath} />;
        }
        return (
          <div className="sign-margin">
            <Grid centered>
              <Grid.Column style={{maxWidth:550,marginTop:20}}>
              <Header style={{color:"#4183c4"}} as='h2'>Sign Up</Header>

              <Form size='big'>      
        <Form.Input  name='firstname' 
        label="First Name"
        value={firstname} 
        placeholder='firstname' 
        onChange={(e) => this.onChange(e)} />

       <Form.Input  name='lastname' 
        label="Last Name"
        value={lastname} 
        placeholder='lastname' 
        onChange={(e) => this.onChange(e)} />

          <Form.Input  name='email' 
        label="Email Address"
        value={email} 
        placeholder='email address' 
        onChange={(e) => this.onChange(e)} />
        {error && error.message=='The email address is already in use by another account.' ? 
        <p style={{color:"red",fontSize:13}}>{error.message}</p> : ""}
          <Form.Input  name='password' 
        label="Password"
        value={password} 
        type="password"
        placeholder='password' 
        onChange={(e) => this.onChange(e)} />
        {error && error.message=='Password should be at least 6 characters' ? <p style={{color:"red",fontSize:13}}>{error.message}</p> : ""}   
        <Form.Field>
          <Radio
            label='seller'
            name='radioGroup'
            value='this'
            usertype='seller'
            checked={this.state.usertype === 'seller'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='customer'
            name='radioGroup'
            value='customer'
            usertype="customer"
            checked={this.state.usertype === 'customer'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button primary disabled={isInvalid} control={Button} onClick={this.onSubmit}>Submit</Button>
       </Form>
       <SignInLink/>
      </Grid.Column>
    </Grid>        
</div>
          
        );
      }
}
const SignUpLink = () => (
    <p>
      Don't have an account? <Link to='/signup'>Sign Up</Link>
    </p>
  );


  export { SignUpLink };


  const mapStateToProps = (state) => {
    return {
      error: state.userReducer.error,
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormBase);
  