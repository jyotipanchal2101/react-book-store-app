import logo from './logo.svg';
import './App.css';
import './assets/semantic/semantic.min.css'
import { Header, Button, Divider } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { SignUpFormBase } from './modules/SignUp/SignUp'
import { SignInFormBase } from './modules/SignIn/SignIn'

function App() {
  return (
    <div className="App">
      {/* <SignUpFormBase/>
      <SignInFormBase/> */}
      <Router>
           <div className="App">
            <Switch>
              <Route exact path='/' component={SignInFormBase}></Route>
              <Route exact path='/signup' component={SignUpFormBase}></Route>
            </Switch>
          </div>
       </Router>
    </div>
  );
}

export default App;
