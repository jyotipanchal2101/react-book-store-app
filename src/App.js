import React, { Suspense } from "react";
import { Route as Router, Switch, withRouter } from "react-router-dom";
import RoutesArr from "./routes/route";
import ProtectedRoute from "./routes/ProtectedRoute";
import { connect } from "react-redux";
import "./assets/semantic/semantic.min.css";
import Header from './components/Header';
import { routeComponents } from './routes/routeComponent';
import ErrorBoundary from './ErrorBoundry';

const App = (props) => {
  
  let routes = <Switch>{routeComponents}</Switch>;

  return (
    <div className="App">
        <Header/>
        <ErrorBoundary>
        <Suspense fallback={<p>Loading..</p>}>
          {routes}
          </Suspense>
          </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.token !== null,
    redirectpath: state.userReducer.authRedirectPath,
    userId: state.userReducer.userId,
    usertype: state.userReducer.usertype
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

