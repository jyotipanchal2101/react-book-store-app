import React, { Component } from 'react';
import { Form,Button,Grid,Header } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { SignInLink } from '../SignIn/SignIn';

const INITIAL_STATE = {
    firstname:'',
    lastname:'',
    password:'',
    email:'',
    error: null,
  };



export class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
}

    
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
     
      render() {
        const { firstname, lastname,  email, password,  error} = this.state;
        const isInvalid = firstname=='' || lastname=='' || email === '' || password === '';

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

        <Button primary disabled={isInvalid} control={Button}>Submit</Button>
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


  export default SignUpFormBase;
  export { SignUpLink };


