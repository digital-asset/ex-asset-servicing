import React, { useEffect, useState, useContext } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import { DamlLedgerContext } from "@daml/react/context";
import { CallSplit, LocalAtm } from "@material-ui/icons";
import { SidebarEntry } from "../../components/Sidebar/SidebarEntry";
import StockSplit from "../corporateactions/StockSplit";
import Dividend from "../corporateactions/Dividend";
import Dividends from "../corporateactions/Dividends";
import StockSplits from "../corporateactions/StockSplits";
import { InitDone } from "@daml2js/asset-servicing-0.0.1/lib/Init";
import { setup, teardown } from "../../scripts/CSD";

function CorporateActions() {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const { ledger, party } = useContext(DamlLedgerContext)!;

  const [isInitialized, setIsInitialized] = useState(false)
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

  const entries : SidebarEntry[] = [
    { key: "dividends", label: "Dividends", path: "/apps/corporateactions/dividends", render: () => <Dividends />, icon: (<LocalAtm/>), children: [] },
    { key: "splits", label: "Stock Splits", path: "/apps/corporateactions/stocksplits", render: () => <StockSplits />, icon: (<CallSplit/>), children: [] },
  ]

  const getChildren = (e : SidebarEntry) : SidebarEntry[] => {
    return e.children.concat(e.children.flatMap(c => getChildren(c)));
  }
  const allEntries = entries.flatMap(e => getChildren(e).concat([e]));

  return (
    <div className={classes.root}>
      <>
        <Header isInitialized={isInitialized} setup={setupScript} teardown={teardownScript}/>
        <Sidebar entries={entries} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route key={"stocksplit"} path={"/apps/corporateactions/stocksplits/:contractId"} component={StockSplit} />
            <Route key={"dividend"} path={"/apps/corporateactions/dividends/:contractId"} component={Dividend} />
            {allEntries.map(e => 
              <Route exact={true} {...e} />
            )}
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(CorporateActions);
