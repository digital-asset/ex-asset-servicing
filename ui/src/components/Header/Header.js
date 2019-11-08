import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, IconButton, CircularProgress, Typography } from "@material-ui/core";
import { Menu, ExitToApp, ArrowBack, Refresh } from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import { useUserDispatch, signOut, useUserState } from "../../context/UserContext";
import { useLedgerDispatch, fetchContracts } from "../../context/LedgerContext";

function Header({ history }) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const ledgerDispatch = useLedgerDispatch();

  // local
  const [isFetching, setIsFetching] = useState(false);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(classes.headerMenuButton, classes.headerMenuButtonCollapse)}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBack
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <Menu
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Asset Servicing
        </Typography>
        <div className={classes.grow} />
        <Typography variant="h6" weight="medium">User: {userState.user}</Typography>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={_e => {
            fetchContracts(ledgerDispatch, userState.token, setIsFetching, () => {});
          }}
          className={classes.headerMenuButton}
        >
          {isFetching
            ? (<CircularProgress className={classes.progress} size={28} color="secondary" />)
            : <Refresh classes={{ root: classes.headerIcon }} />}
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={_e => signOut(userDispatch, history)}
        >
          <ExitToApp classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
