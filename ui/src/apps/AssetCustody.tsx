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
import { SidebarEntry, getChildren } from "../components/Sidebar/SidebarEntry";
import AssetDeposits from "../pages/assetdeposits/AssetDeposits";
import Exercises from "../pages/exercises/Exercises";
import Exercise from "../pages/exercises/Exercise";
import Warrants from "../pages/warrants/Warrants";
import SettlementInstructions from "../pages/settlementinstructions/SettlementInstructions";

function AssetCustody() {
  const classes = useStyles();
  const layoutState = useLayoutState();

  const party = useParty();
  const depositories = useQuery(Depository).contracts;
  const isDepository = depositories.length > 0 && depositories[0].payload.depository === party;
  const agents = useQuery(Agent).contracts;
  const isAgent = agents.length > 0 && agents[0].payload.agent === party;
  const issuers = useQuery(Issuer).contracts;
  const isIssuer = issuers.length > 0 && issuers[0].payload.issuer === party;

  var entries : SidebarEntry[] = [];
  if (isDepository) {
    entries.push({ label: "Assets", path: "/apps/assetcustody/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [], divider: true });
    entries.push({ label: "Settlement", path: "/apps/assetcustody/settlement", render: () => (<SettlementInstructions />), icon: (<Poll/>), children: [] });
  } else if (isAgent) {
    entries.push({ label: "Exercises", path: "/apps/assetcustody/exercises", render: () => <Exercises />, icon: (<Poll/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetcustody/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [] });
  } else if (isIssuer) {
    entries.push({ label: "Assets", path: "/apps/assetcustody/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [] });
  } else {
    entries.push({ label: "Warrants", path: "/apps/assetcustody/warrants", render: () => (<Warrants />), icon: (<Poll/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetcustody/assets", render: () => (<AssetDeposits />), icon: (<Poll/>), children: [] });
  }

  entries = entries.flatMap(e => getChildren(e).concat([e]));

  return (
    <div className={classes.root}>
      <>
        <Header app="Custody" isInitialized={true}/>
        <Sidebar entries={entries} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route key={"exercise"} path={"/apps/assetcustody/exercises/:contractId"} component={Exercise} />
            {entries.map(e => 
              <Route exact={true} key={e.label} {...e} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(AssetCustody);
