import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu, ExitToApp, ArrowBack, Apps } from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import { useUserDispatch, signOut, useUserState } from "../../context/UserContext";
import { getRole } from "../../config";

function Header({ history } : RouteComponentProps) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const user = useUserState();
  const isCsd = getRole(user.party) === "CSD";
  const userDispatch = useUserDispatch();

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
        <Typography variant="h6" className={classes.logotype}>
          Asset Servicing ({isCsd ? "CSD" : "BANK"})
        </Typography>
        <div className={classes.grow} />
        <Typography variant="h6">User: {user.party}</Typography>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={() => history.push("/apps")}
          className={classes.headerMenuButton}
        >
          <Apps classes={{ root: classes.headerIcon }} />
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(event) => signOut(userDispatch, history)}
        >
          <ExitToApp classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);