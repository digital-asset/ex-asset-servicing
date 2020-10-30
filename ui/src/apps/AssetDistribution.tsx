import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useLayoutState } from "../context/LayoutContext";
import { Poll } from "@material-ui/icons";
import { SidebarEntry } from "../components/Sidebar/SidebarEntry";
import {  useParty, useQuery } from "@daml/react";
import { Agent } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import Distributions from "../pages/distributions/Distributions";
import Distribution from "../pages/distributions/Distribution";

function AssetDistribution() {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const party = useParty();
  const agents = useQuery(Agent).contracts;
  const isAgent = agents.length > 0 && agents[0].payload.agent === party;
  
  const entries : SidebarEntry[] = [
    { label: "Distributions", path: "/apps/assetdistribution/distributions", render: () => (<Distributions />), icon: (<Poll/>), children: [] }
  ];

  if (isAgent) {
    // entries.push({ label: "Distributions", path: "/apps/distribution/distributions", render: () => (<Distributions />), icon: (<Poll/>), children: [] });
  }

  return (
    <div className={classes.root}>
      <>
        <Header app="Distribution" isInitialized={true} />
        <Sidebar entries={entries} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
          <Route key={"distribution"} path={"/apps/assetdistribution/distributions/:contractId"} component={Distribution} />
            {entries.map(e => 
              <Route exact={true} key={e.label} path={e.path} render={e.render} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(AssetDistribution);
