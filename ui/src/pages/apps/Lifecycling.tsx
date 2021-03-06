import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import { TrendingUp, ConfirmationNumber } from "@material-ui/icons";
import { SidebarEntry } from "../../components/Sidebar/SidebarEntry";
import Bond from "../lifecycling/Bond";
import Derivatives from "../lifecycling/Derivatives";
import Derivative from "../lifecycling/Derivative";
import Bonds from "../lifecycling/Bonds";

function Lifecycling() {
  const classes = useStyles();
  const layoutState = useLayoutState();

  const entries : SidebarEntry[] = [
    { label: "Bonds", path: "/apps/lifecycling/bonds", render: () => <Bonds />, icon: (<ConfirmationNumber/>), children: [] },
    { label: "Derivatives", path: "/apps/lifecycling/derivatives", render: () => <Derivatives />, icon: (<TrendingUp/>), children: [] },
  ]

  const getChildren = (e : SidebarEntry) : SidebarEntry[] => {
    return e.children.concat(e.children.flatMap(c => getChildren(c)));
  }
  const allEntries = entries.flatMap(e => getChildren(e).concat([e]));

  return (
    <div className={classes.root}>
      <>
        <Header isInitialized={true}/>
        <Sidebar entries={entries} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route key="bonds" path={"/apps/lifecycling/bonds/:contractId"} component={Bond} />
            <Route key="derivatives" path={"/apps/lifecycling/derivatives/:contractId"} component={Derivative} />
            {allEntries.map(e => 
              <Route exact={true} {...e} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Lifecycling);
