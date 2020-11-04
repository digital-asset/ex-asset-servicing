import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import Poll from "@material-ui/icons/Poll";
import { useParty, useQuery } from "@daml/react";
import { Agent, Depository, Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import useStyles from "./styles";
import { useLayoutState } from "../context/LayoutContext";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarEntry } from "../components/Sidebar/SidebarEntry";
import Distributions from "../pages/distributions/Distributions";
import Distribution from "../pages/distributions/Distribution";
import NewDistribution from "../pages/newdistribution/NewDistribution";
import AssetDeposits from "../pages/assetdeposits/AssetDeposits";
import Subscriptions from "../pages/subscriptions/Subscriptions";
import SettlementInstructions from "../pages/settlementinstructions/SettlementInstructions";

function AssetDistribution() {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const party = useParty();
  const depositories = useQuery(Depository).contracts;
  const isDepository = depositories.length > 0 && depositories[0].payload.depository === party;
  const agents = useQuery(Agent).contracts;
  const isAgent = agents.length > 0 && agents[0].payload.agent === party;
  const issuers = useQuery(Issuer).contracts;
  const isIssuer = issuers.length > 0 && issuers[0].payload.issuer === party;

  const entries : SidebarEntry[] = [];
  if (isDepository) {
    entries.push({ label: "Assets", path: "/apps/assetdistribution/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [], divider: true });
    entries.push({ label: "Settlement", path: "/apps/assetdistribution/settlement", render: () => (<SettlementInstructions />), icon: (<Poll/>), children: [] });
  } else if (isAgent) {
    entries.push({ label: "Distributions", path: "/apps/assetdistribution/distributions", render: () => (<Distributions />), icon: (<Poll/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetdistribution/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [] });
  } else if (isIssuer) {
    entries.push({ label: "New Distribution", path: "/apps/assetdistribution/newdistribution", render: () => (<NewDistribution />), icon: (<Poll/>), children: [] });
    entries.push({ label: "Distributions", path: "/apps/assetdistribution/distributions", render: () => (<Distributions />), icon: (<Poll/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetdistribution/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [] });
  } else {
    entries.push({ label: "Subscriptions", path: "/apps/assetdistribution/subscriptions", render: () => (<Subscriptions />), icon: (<Poll/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetdistribution/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [] });
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
