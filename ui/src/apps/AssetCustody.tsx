import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useLayoutState } from "../context/LayoutContext";
import { TrendingUp, ConfirmationNumber, LocalAtm, CallSplit, AccountBalanceWallet, AccountBalance } from "@material-ui/icons";
import { SidebarEntry, getChildren } from "../components/Sidebar/SidebarEntry";
import Bond from "../pages/lifecycling/Bond";
import Derivatives from "../pages/lifecycling/Derivatives";
import Derivative from "../pages/lifecycling/Derivative";
import Bonds from "../pages/lifecycling/Bonds";
import Dividends from "../pages/corporateactions/Dividends";
import StockSplits from "../pages/corporateactions/StockSplits";
import AssetDeposits from "../pages/assetdeposits/AssetDeposits";
import Balance from "../pages/balance/Balance";
import StockSplit from "../pages/corporateactions/StockSplit";
import Dividend from "../pages/corporateactions/Dividend";
import AssetDeposit from "../pages/assetdeposits/AssetDeposit";

function AssetCustody() {
  const classes = useStyles();
  const layoutState = useLayoutState();

  const entries : SidebarEntry[] = [
    { label: "Positions", path: "/apps/assetcustody/positions", render: () => (<></>), icon: (<AccountBalanceWallet/>), children: [
      { label: "Assets", path: "/apps/assetcustody/positions/assets", render: () => (<AssetDeposits role="owner" />), icon: (<AccountBalanceWallet/>), children: [] },
      { label: "Liabilities", path: "/apps/assetcustody/positions/liabilities", render: () => (<AssetDeposits role="provider" />), icon: (<AccountBalanceWallet/>), children: [] },
      { label: "Balance", path: "/apps/assetcustody/positions/balance", render: () => (<Balance />), icon: (<AccountBalance/>), children: [] }
    ] },
    { label: "Events", path: "/apps/assetcustody/events", render: () => (<></>), icon: (<AccountBalanceWallet/>), children: [
      { label: "Stock Dividends", path: "/apps/assetcustody/events/dividends", render: () => <Dividends />, icon: (<LocalAtm/>), children: [] },
      { label: "Stock Splits", path: "/apps/assetcustody/events/stocksplits", render: () => <StockSplits />, icon: (<CallSplit/>), children: [] },
      { label: "Bonds", path: "/apps/assetcustody/events/bonds", render: () => <Bonds />, icon: (<ConfirmationNumber/>), children: [] },
      { label: "Derivatives", path: "/apps/assetcustody/events/derivatives", render: () => <Derivatives />, icon: (<TrendingUp/>), children: [] },
    ] },
  ].flatMap(e => getChildren(e).concat([e]));

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
            <Route key={"deposits"} path={"/apps/assetcustody/positions/:contractId"} component={AssetDeposit} />
            <Route key={"stocksplit"} path={"/apps/assetcustody/events/stocksplits/:contractId"} component={StockSplit} />
            <Route key={"dividend"} path={"/apps/assetcustody/events/dividends/:contractId"} component={Dividend} />
            <Route key="bonds" path={"/apps/assetcustody/events/bonds/:contractId"} component={Bond} />
            <Route key="derivatives" path={"/apps/assetcustody/events/derivatives/:contractId"} component={Derivative} />
            {entries.map(e => 
              <Route exact={true} {...e} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(AssetCustody);
