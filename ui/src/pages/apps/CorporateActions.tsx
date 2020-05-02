import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import DamlLedger from "@daml/react";
import { useUserState } from "../../context/UserContext";
import { wsBaseUrl, httpBaseUrl } from "../../config";
import { CallSplit, LocalAtm } from "@material-ui/icons";
import { SidebarEntry } from "../../components/Sidebar/SidebarEntry";
import StockSplit from "../corporateactions/StockSplit";
import Dividend from "../corporateactions/Dividend";
import Dividends from "../corporateactions/Dividends";
import StockSplits from "../corporateactions/StockSplits";

function CorporateActions() {
  const classes = useStyles();
  const user = useUserState();
  const layoutState = useLayoutState();

  const entries : SidebarEntry[] = [
    { key: "dividends", label: "Dividends", path: "/apps/corporateactions/dividends", render: () => <Dividends />, icon: (<LocalAtm/>), children: [] },
    { key: "splits", label: "Stock Splits", path: "/apps/corporateactions/stocksplits", render: () => <StockSplits />, icon: (<CallSplit/>), children: [] },
  ]

  const getChildren = (e : SidebarEntry) : SidebarEntry[] => {
    return e.children.concat(e.children.flatMap(c => getChildren(c)));
  }
  const allEntries = entries.flatMap(e => getChildren(e).concat([e]));

  return (
    <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
      <div className={classes.root}>
          <>
            <Header />
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
    </DamlLedger>
  );
}

export default withRouter(CorporateActions);
