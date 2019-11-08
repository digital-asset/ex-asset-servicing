import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useLayoutState } from "../../context/LayoutContext";
import Default from "../../pages/default/Default";
import EqStock from "../../pages/refdata/EqStock"
import EqOption from "../../pages/refdata/EqOption"
import EqACBRC from "../../pages/refdata/EqACBRC"
import Position from "../../pages/tradeStore/Position"
import Transaction from "../../pages/tradeStore/Transaction"

function Layout(props) {
  const classes = useStyles();
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/default" component={Default} />
              <Route path="/app/eqStock" component={EqStock} />
              <Route path="/app/eqOption" component={EqOption} />
              <Route path="/app/eqACBRC" component={EqACBRC} />
              <Route path="/app/position" component={Position} />
              <Route path="/app/transaction" component={Transaction} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
