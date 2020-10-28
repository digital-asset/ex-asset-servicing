import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import { Poll, BarChart, AccountBalanceWallet, AccountBalance, SubdirectoryArrowRight } from "@material-ui/icons";
import { SidebarEntry } from "../../components/Sidebar/SidebarEntry";
import Positions from "../positions/Positions";
import Balance from "../balance/Balance";
import { useLedger, useParty, useStreamQuery } from "@daml/react";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { setup, teardown } from "../../scripts/Agent";
import Accounts from "../accounts/Accounts";
import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { useUserState } from "../../context/UserContext";

function AssetExplorer() {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const user = useUserState();

  const ledger = useLedger();
  const party = useParty();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    async function getInit() {
      const initDone = await ledger.fetchByKey(InitDone, party);
      if (initDone)
        setIsInitialized(true);
      else
        setIsInitialized(false);
    }
    getInit();
  }, [ledger, party]);

  const setupScript = async () => { await setup(ledger, party); setIsInitialized(true); };
  const teardownScript = async () => { await teardown(ledger, party); setIsInitialized(false); };

  const deposits = useStreamQuery(AssetDeposit).contracts;
  const own = deposits.filter(d => d.payload.account.owner === party).map(d => d.payload.account.id.label).filter((v, i, a) => a.indexOf(v) === i).sort();
  const clients = deposits.filter(d => d.payload.account.provider === party).map(d => d.payload.account.id.label).filter((v, i, a) => a.indexOf(v) === i).sort();
  const ownEntries = own.map(label => {
    return { key: label, label, path: "/apps/assetexplorer/accounts/own/" + label, render: () => (<Accounts role="owner" account={label}/>), icon: (<></>), children: [] }; });
  const clientEntries = clients.map(label => {
    return { key: label, label, path: "/apps/assetexplorer/accounts/clients/" + label, render: () => (<Accounts role="provider" account={label}/>), icon: (<></>), children: [] }; });
  
  const entries : SidebarEntry[] = [
    { label: "Positions", path: "/apps/assetexplorer/positions", render: () => (<Positions />), icon: (<Poll/>), children: [
      { label: "Equities", path: "/apps/assetexplorer/positions/equities", render: () => (<Positions assetClass="Equity" />), icon: (<BarChart/>), children: [
        { label: "Stocks", path: "/apps/assetexplorer/positions/equities/stocks", render: () => (<Positions assetClass="Equity" assetType="Stock" />), icon: (<BarChart/>), children: [] },
        { label: "Options", path: "/apps/assetexplorer/positions/equities/options", render: () => (<Positions assetClass="Equity" assetType="Option" />), icon: (<BarChart/>), children: [] },
        { label: "Exotics", path: "/apps/assetexplorer/positions/equities/exotics", render: () => (<Positions assetClass="Equity" assetType="Exotic" />), icon: (<BarChart/>), children: [] } ] },
      { label: "FX", path: "/apps/assetexplorer/positions/fx", render: () => (<Positions assetClass="FX" />), icon: (<BarChart/>), children: [
        { label: "Currencies", path: "/apps/assetexplorer/positions/fx/currencies", render: () => (<Positions assetClass="FX" assetType="Currency" />), icon: (<BarChart/>), children: [] } ] },
      { label: "FixedIncome", path: "/apps/assetexplorer/positions/fixedincome", render: () => (<Positions assetClass="FixedIncome" />), icon: (<BarChart/>), children: [
        { label: "Bonds", path: "/apps/assetexplorer/positions/fixedincome/bonds", render: () => (<Positions assetClass="FixedIncome" assetType="Bond" />), icon: (<BarChart/>), children: [] } ] } ] },
    { label: "Accounts", path: "/apps/assetexplorer/accounts", render: () => (<Accounts />), icon: (<AccountBalanceWallet/>), children: [
      { label: "Own", path: "/apps/assetexplorer/accounts/own", render: () => (<Accounts role="owner" />), icon: (<SubdirectoryArrowRight/>), children: ownEntries },
      { label: "Clients", path: "/apps/assetexplorer/accounts/clients", render: () => (<Accounts role="provider" />), icon: (<SubdirectoryArrowRight/>), children: clientEntries } ] },
    { label: "Balance", path: "/apps/assetexplorer/balance", render: () => (<Balance />), icon: (<AccountBalance/>), children: [] }
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
          {/* <Route key={"stock"} path={"/app/positions/equities/stocks/:contractId"} component={Stock} />
          <Route key={"option"} path={"/app/positions/equities/options/:contractId"} component={Option} />
          <Route key={"exotic"} path={"/app/positions/equities/exotics/:contractId"} component={Exotic} />
          <Route key={"currency"} path={"/app/positions/fx/currencies/:contractId"} component={Currency} />
          <Route key={"bond"} path={"/app/positions/fixedincome/bonds/:contractId"} component={Bond} /> */}
            {allEntries.map(e => 
              <Route exact={true} key={e.label} path={e.path} render={e.render} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(AssetExplorer);
