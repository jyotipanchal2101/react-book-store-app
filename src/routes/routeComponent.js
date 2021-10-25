import React from "react";
import RoutesArr from "./route";
import ProtectedRoute from "./ProtectedRoute";
import { Route as Router} from "react-router-dom";

const isAuthenticated = localStorage.getItem("token");

export const routeComponents = RoutesArr.map(
    ({ path, name, compPath, isExact, authRoute }) => {
      let DynComponent = React.lazy(() => {
        return import(`../containers/${compPath}`);
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