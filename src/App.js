import React, { useEffect, Suspense } from "react";
import { Route as Router, Switch, withRouter } from "react-router-dom";
import RoutesArr from "./routes/route";
import ProtectedRoute from "./routes/ProtectedRoute";
import { connect } from "react-redux";
// import { authCheckState } from "./store/actions/index";
import "./assets/semantic/semantic.min.css";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
const App = (props) => {
  // const { onTryAutoSignup } = props;
  // useEffect(() => {
  //   onTryAutoSignup();
  // }, [onTryAutoSignup]);

  const isAuthenticated = localStorage.getItem("token");

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
      <Provider store={configureStore()}>
        <Suspense fallback={<p>Loading..</p>}>{routes}</Suspense>
        </Provider>
    </div>
  );
};
export default App;

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//     redirectpath: state.auth.authRedirectPath,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(authCheckState()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

