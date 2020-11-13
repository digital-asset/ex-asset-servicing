import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import { useParty, useQuery } from "@daml/react";
import { Agent, Depository, Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import useStyles from "./styles";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useLayoutState } from "../context/LayoutContext";
import { SidebarEntry } from "../components/Sidebar/SidebarEntry";
import AdmissionChecks from "../pages/admissionchecks/AdmissionChecks";
import CodeAllocations from "../pages/codeallocations/CodeAllocations";
import GlobalNotes from "../pages/globalnotes/GlobalNotes";
import DepositInstructions from "../pages/depositinstructions/DepositInstructions";
import NewWarrant from "../pages/newissuance/newwarrant/NewWarrant";
import NewIssuance from "../pages/newissuance/NewIssuance";
import Issuance from "../pages/issuances/Issuance";
import Issuances from "../pages/issuances/Issuances";
import AssetDeposits from "../pages/assetdeposits/AssetDeposits";
import { Add, LocalAtm, PlayArrow, Settings } from "@material-ui/icons";

function AssetIssuance() {
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

  if (isIssuer) {
    entries.push({ label: "New Issuance", path: "/apps/assetissuance/newissuance", render: () => (<NewIssuance />), icon: (<Add/>), children: [] });
    entries.push({ label: "Issuances", path: "/apps/assetissuance/issuances", render: () => (<Issuances />), icon: (<PlayArrow/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetissuance/assets", render: () => (<AssetDeposits />), icon: (<LocalAtm/>), children: [] });
  } else if (isAgent) {
    entries.push({ label: "Issuances", path: "/apps/assetissuance/issuances", render: () => (<Issuances />), icon: (<PlayArrow/>), children: [] });
  } else if (isDepository) {
    entries.push({ label: "Issuances", path: "/apps/assetissuance/issuances", render: () => (<Issuances />), icon: (<PlayArrow/>), children: [] });
    entries.push({ label: "Assets", path: "/apps/assetissuance/assets", render: () => (<AssetDeposits />), icon: (<LocalAtm/>), children: [], divider: true });
    entries.push({ label: "Security Admission", path: "/apps/assetissuance/admissionchecks", render: () => (<AdmissionChecks />), icon: (<Settings/>), children: [] });
    entries.push({ label: "Code Allocation", path: "/apps/assetissuance/codeallocations", render: () => (<CodeAllocations />), icon: (<Settings/>), children: [] });
    entries.push({ label: "Global Notes", path: "/apps/assetissuance/globalnotes", render: () => (<GlobalNotes />), icon: (<Settings/>), children: [] });
    entries.push({ label: "Deposit Instructions", path: "/apps/assetissuance/depositinstructions", render: () => (<DepositInstructions />), icon: (<Settings/>), children: [] });
  }

  return (
    <div className={classes.root}>
      <>
        <Header app="Issuance" isInitialized={true} />
        <Sidebar entries={entries} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route key={"issuance"} path={"/apps/assetissuance/issuances/:contractId"} component={Issuance} />
            <Route key={"newwarrant"} path={"/apps/assetissuance/newissuance/newwarrant"} component={NewWarrant} />
            {entries.map(e => 
              <Route exact={true} key={e.label} path={e.path} render={e.render} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(AssetIssuance);
