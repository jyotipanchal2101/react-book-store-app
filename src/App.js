import React, { Suspense } from "react";
import { Route as Router, Switch, withRouter } from "react-router-dom";
import RoutesArr from "./routes/route";
import ProtectedRoute from "./routes/ProtectedRoute";
import { connect } from "react-redux";
import "./assets/semantic/semantic.min.css";
import Header from './components/Header';
import { routeComponents } from './routes/routeComponent';

const App = (props) => {
  const isAuthenticated = localStorage.getItem("token");
  const routeComponents = RoutesArr.map(
    ({ path, name, compPath, isExact, authRoute }) => {
      let DynComponent = React.lazy(() => {
        return import(`./containers/${compPath}`);
      });
      if (authRoute) {
        return (
          <ProtectedRoute
            exact={isExact}
            path={path}
            isAuthenticated={isAuthenticated}
            component={DynComponent}
            key={name}
          />
        );
      } else {
        return (
          <Router
            exact={isExact}
            path={path}
            component={DynComponent}
            key={name}
          />
        );
      }
    }
  );

  let routes = <Switch>{routeComponents}</Switch>;

  return (
    <div className="App">
        <Header/>
        <Suspense fallback={<p>Loading..</p>}>{routes}</Suspense>
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

