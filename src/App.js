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
import { Provider } from "react-redux";
import SignUpFormBase from './components/SignUp/SignUp'
import SignInComponent from './components/SignIn/SignIn'
import configureStore from "./redux/store";

function App() {
  return (
    <div className="App">
      {/* <SignUpFormBase/>
      <SignInFormBase/> */}
       <Provider store={configureStore()}>
      <Router>
           <div className="App">
            <Switch>
            <Route exact path="/" component={SignInComponent} />
              {/* <Route exact path='/' component={SignInFormBase}></Route> */}
              <Route exact path='/signup' component={SignUpFormBase}></Route>
            </Switch>
          </div>
       </Router>
       </Provider>
    </div>
  );
}

export default App;
