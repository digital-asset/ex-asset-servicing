import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import ErrorComponent from "../pages/error/Error";
import { useUserState, useUserDispatch } from "../context/UserContext";
import Login from "../pages/login/Login";
import Apps from "../pages/apps/Apps";
import CorporateActions from "../pages/apps/CorporateActions";
import Lifecycling from "../pages/apps/Lifecycling";
import PositionManagement from "../pages/apps/PositionManagement";
import DamlLedger from "@daml/react";
import { httpBaseUrl, wsBaseUrl } from "../config";

type MainProps = {
  defaultPath: string
}

export default function Main({ defaultPath }: MainProps) {
  const user = useUserState();
  
  return (
    <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={RootRoute} />
          <PrivateRoute exact path="/apps" component={Apps} />
          <PrivateRoute path="/apps/corporateactions" component={CorporateActions} />
          <PrivateRoute path="/apps/lifecycling" component={Lifecycling} />
          <PrivateRoute path="/apps/positions" component={PositionManagement} />
          <PublicRoute path="/login" component={Login} />
          <Route component={ErrorComponent} />
        </Switch>
      </HashRouter>
    </DamlLedger>
  );

  // #######################################################################

  function RootRoute() {
    var userDispatch = useUserDispatch();

    useEffect(() => {
      const url = new URL(window.location.toString());
      const token = url.searchParams.get('token');
      if (token === null) {
        return;
      }
      const party = url.searchParams.get('party');
      if (party === null) {
        throw Error("When 'token' is passed via URL, 'party' must be passed too.");
      }
      localStorage.setItem("daml.party", party);
      localStorage.setItem("daml.token", token);

      userDispatch({ type: "LOGIN_SUCCESS", token, party });
    })

    return (
      <Redirect to={defaultPath} />
    )
  }

  function PrivateRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={props =>
          user.isAuthenticated ? (
            React.createElement(component, props)
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={props =>
          user.isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
              React.createElement(component, props)
            )
        }
      />
    );
  }
}
