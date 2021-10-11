import React, { useEffect, Suspense } from "react";
import { Route as Router, Switch, withRouter } from "react-router-dom";
import RoutesArr from "./routes/route";
import ProtectedRoute from "./routes/ProtectedRoute";
import { connect } from "react-redux";
import { authCheckState } from "./redux/actions/userAction";
import "./assets/semantic/semantic.min.css";
import SidebarExampleVisible  from "./components/SideBar";
import Header from './components/Header';

const App = (props) => {
  // const { onTryAutoSignup } = props;
  // useEffect(() => {
  //   onTryAutoSignup();
  // }, [onTryAutoSignup]);

  const isAuthenticated = localStorage.getItem("token");
  console.log('userId in app', props.userId);
  const routeComponents = RoutesArr.map(
    ({ path, name, compPath, isExact, authRoute }) => {
      let DynComponent = React.lazy(() => {
        return import(`./containers/${compPath}`);
      });
      console.log('DynComponent', DynComponent)
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
        {/* <SidebarExampleVisible/> */}
        <Header/>
        <Suspense fallback={<p>Loading..</p>}>{routes}</Suspense>
    </div>
  );
};
// export default withRouter(App);

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
   // onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

