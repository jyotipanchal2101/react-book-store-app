import React, { Component } from 'react';
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { SignUpLink } from '../SignUp/SignUp';
import { Link } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
// import SignInSocial from './SignInSocial';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

export class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, user:{} };
  }

  componentDidMount(){
    // this.authListener();
    //   }
    
    //   authListener =()=>{
    //     this.props.userStore.authUser().onAuthStateChanged(user=>{
    //       if(user){
    //         this.setState({user})
    //       }else{
    //         this.setState({user:null})
    //       }
    //     })
        }


//   onSubmit = async event => {
//     const { email, password } = this.state;
//     try {
//       const response = await  this.props.userStore.signIn(email, password)
//       this.setState({ ...INITIAL_STATE });
//       this.props.history.push(ROUTES.HOME);
//     }catch(error ) {
//            this.setState({ error });
//         }
//     event.preventDefault();
//   };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

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

export default SignInFormBase;

export { SignInLink };