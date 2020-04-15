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
import { List } from "@material-ui/icons";
import { SidebarEntry } from "../../components/Sidebar/SidebarEntry";
import Positions from "../positions/Positions";

function PositionManagement() {
  const classes = useStyles();
  const user = useUserState();
  const layoutState = useLayoutState();

  const entries : SidebarEntry[] =
    [ { key: "positions", label: "Positions", path: "/apps/positions", render: () => (<Positions />), icon: (<List/>), children:
      [ { key: "equities", label: "Equities", path: "/apps/positions/equities", render: () => (<Positions assetClass="Equity" />), icon: (<List/>), children:
          [ { key: "stocks", label: "Stocks", path: "/apps/positions/equities/stocks", render: () => (<Positions assetClass="Equity" assetType="Stock" />), icon: (<List/>), children: [] },
            { key: "options", label: "Options", path: "/apps/positions/equities/options", render: () => (<Positions assetClass="Equity" assetType="Option" />), icon: (<List/>), children: [] },
            { key: "exotics", label: "Exotics", path: "/apps/positions/equities/exotics", render: () => (<Positions assetClass="Equity" assetType="Exotic" />), icon: (<List/>), children: [] } ] },
        { key: "fx", label: "FX", path: "/apps/positions/fx", render: () => (<Positions assetClass="FX" />), icon: (<List/>), children:
          [ { key: "currencies", label: "Currencies", path: "/apps/positions/fx/currencies", render: () => (<Positions assetClass="FX" assetType="Currency" />), icon: (<List/>), children: [] } ] },
        { key: "fi", label: "FixedIncome", path: "/apps/positions/fixedincome", render: () => (<Positions assetClass="FixedIncome" />), icon: (<List/>), children:
          [ { key: "bonds", label: "Bonds", path: "/apps/positions/fixedincome/bonds", render: () => (<Positions assetClass="FixedIncome" assetType="Bond" />), icon: (<List/>), children: [] } ] } ] } ]

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
    </DamlLedger>
  );
}

export default withRouter(PositionManagement);
