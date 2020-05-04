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
import { InitDone } from "@daml2js/asset-servicing-0.0.1/lib/Init";
import { setup, teardown } from "../../scripts/BANK";
import Accounts from "../accounts/Accounts";
import { AssetDeposit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { useUserState } from "../../context/UserContext";
import { getRole } from "../../config";

function PositionManagement() {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const user = useUserState();
  const role = getRole(user.name);

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

  const setupScript = role === "BANK" ? async () => { await setup(ledger, party); setIsInitialized(true); } : undefined;
  const teardownScript = role === "BANK" ? async () => { await teardown(ledger, party); setIsInitialized(false); } : undefined;

  const deposits = useStreamQuery(AssetDeposit).contracts;
  const own = deposits.filter(d => d.payload.account.owner === party).map(d => d.payload.account.id.label).filter((v, i, a) => a.indexOf(v) === i).sort();
  const clients = deposits.filter(d => d.payload.account.provider === party).map(d => d.payload.account.id.label).filter((v, i, a) => a.indexOf(v) === i).sort();
  const ownEntries = own.map(label => {
    return { key: label, label, path: "/apps/positionmanagement/accounts/own/" + label, render: () => (<Accounts role="owner" account={label}/>), icon: (<></>), children: [] }; });
  const clientEntries = clients.map(label => {
    return { key: label, label, path: "/apps/positionmanagement/accounts/clients/" + label, render: () => (<Accounts role="provider" account={label}/>), icon: (<></>), children: [] }; });
  
  const entries : SidebarEntry[] = [
    { key: "positions", label: "Positions", path: "/apps/positionmanagement/positions", render: () => (<Positions />), icon: (<Poll/>), children: [
      { key: "equities", label: "Equities", path: "/apps/positionmanagement/positions/equities", render: () => (<Positions assetClass="Equity" />), icon: (<BarChart/>), children: [
        { key: "stocks", label: "Stocks", path: "/apps/positionmanagement/positions/equities/stocks", render: () => (<Positions assetClass="Equity" assetType="Stock" />), icon: (<BarChart/>), children: [] },
        { key: "options", label: "Options", path: "/apps/positionmanagement/positions/equities/options", render: () => (<Positions assetClass="Equity" assetType="Option" />), icon: (<BarChart/>), children: [] },
        { key: "exotics", label: "Exotics", path: "/apps/positionmanagement/positions/equities/exotics", render: () => (<Positions assetClass="Equity" assetType="Exotic" />), icon: (<BarChart/>), children: [] } ] },
      { key: "fx", label: "FX", path: "/apps/positionmanagement/positions/fx", render: () => (<Positions assetClass="FX" />), icon: (<BarChart/>), children: [
        { key: "currencies", label: "Currencies", path: "/apps/positionmanagement/positions/fx/currencies", render: () => (<Positions assetClass="FX" assetType="Currency" />), icon: (<BarChart/>), children: [] } ] },
      { key: "fi", label: "FixedIncome", path: "/apps/positionmanagement/positions/fixedincome", render: () => (<Positions assetClass="FixedIncome" />), icon: (<BarChart/>), children: [
        { key: "bonds", label: "Bonds", path: "/apps/positionmanagement/positions/fixedincome/bonds", render: () => (<Positions assetClass="FixedIncome" assetType="Bond" />), icon: (<BarChart/>), children: [] } ] } ] } ];
  if (role === "BANK") {
    entries.push(
      { key: "accounts", label: "Accounts", path: "/apps/positionmanagement/accounts", render: () => (<Accounts />), icon: (<AccountBalanceWallet/>), children: [
        { key: "own", label: "Own", path: "/apps/positionmanagement/accounts/own", render: () => (<Accounts role="owner" />), icon: (<SubdirectoryArrowRight/>), children: ownEntries },
        { key: "clients", label: "Clients", path: "/apps/positionmanagement/accounts/clients", render: () => (<Accounts role="provider" />), icon: (<SubdirectoryArrowRight/>), children: clientEntries } ] },
      { key: "balance", label: "Balance", path: "/apps/positionmanagement/balance", render: () => (<Balance />), icon: (<AccountBalance/>), children: [] }
    );
  }

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
              <Route exact={true} key={e.key} path={e.path} render={e.render} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(PositionManagement);
