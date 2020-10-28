import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import { Poll, BarChart, AccountBalanceWallet, AccountBalance, SubdirectoryArrowRight } from "@material-ui/icons";
import { SidebarEntry } from "../../components/Sidebar/SidebarEntry";
import { useLedger, useParty } from "@daml/react";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { setup as depositorySetup, teardown as depositoryTeardown } from "../../scripts/Depository";
import { setup as issuerSetup, teardown as issuerTeardown } from "../../scripts/Issuer";
import Warrant from "../warrants/Warrant";
import Warrants from "../warrants/Warrants";
import { Depository, Issuer } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";

function Issuance() {
  const classes = useStyles();
  const layoutState = useLayoutState();

  const ledger = useLedger();
  const party = useParty();
  const [isDepository, setIsDepository] = useState(false);
  const [isIssuer, setIsIssuer] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    async function initialize() {
      const initDone = await ledger.fetchByKey(InitDone, party);
      const depositoryRoles = await ledger.query(Depository);
      const issuerRoles = await ledger.query(Issuer);
      setIsInitialized(!!initDone);
      setIsDepository(depositoryRoles.length > 0);
      setIsIssuer(issuerRoles.length > 0);
    }
    initialize();
  }, [ledger, party]);

  const setupScript = isDepository
    ? async () => { await depositorySetup(ledger, party); setIsInitialized(true); }
    : (isIssuer ? async () => { await issuerSetup(ledger, party); setIsInitialized(true); } : undefined);
  const teardownScript = isDepository
    ? async () => { await depositoryTeardown(ledger, party); setIsInitialized(true); }
    : (isIssuer ? async () => { await issuerTeardown(ledger, party); setIsInitialized(true); } : undefined);

  const entries : SidebarEntry[] = [
    { label: "Warrants", path: "/apps/issuance/warrants", render: () => (<Warrants />), icon: (<Poll/>), children: [] },
  ];

  const getChildren = (e : SidebarEntry) : SidebarEntry[] => {
    return e.children.concat(e.children.flatMap(c => getChildren(c)));
  }
  const allEntries = entries.flatMap(e => getChildren(e).concat([e]));

  return (
    <div className={classes.root}>
      <>
        <Header isInitialized={isInitialized} setup={setupScript} teardown={teardownScript} />
        <Sidebar entries={entries} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
          <Route key={"warrant"} path={"/apps/issuance/warrants/:contractId"} component={Warrant} />
            {allEntries.map(e => 
              <Route exact={true} key={e.label} path={e.path} render={e.render} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Issuance);
