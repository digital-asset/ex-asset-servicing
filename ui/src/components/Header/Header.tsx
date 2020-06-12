import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Grid, Box, CircularProgress } from "@material-ui/core";
import { ExitToApp, Apps, PlayArrow, FastRewind } from "@material-ui/icons";
import useStyles from "./styles";
import { useUserDispatch, signOut, useUserState } from "../../context/UserContext";
import { getRole } from "../../config";
import headerLogo from "../../images/headerLogo.png";
import loginLogo from "../../images/loginLogo.svg";

interface HeaderProps {
  isInitialized : boolean
  setup? : () => Promise<void>
  teardown? : () => Promise<void>
}

function Header({ history, isInitialized, setup, teardown } : RouteComponentProps & HeaderProps) {
  const classes = useStyles();

  // global
  const user = useUserState();
  const role = getRole(user.name);

  const userDispatch = useUserDispatch();
  const [isInitializing, setIsInitializing] = useState(false);
  const runScript = async () => {
    setIsInitializing(true);
    if (isInitialized)
      await teardown!();
    else
      await setup!();
    setIsInitializing(false);
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img alt="loginLogo" src={loginLogo} height="16px" />
        <Typography variant="h6" className={classes.logotype}>
          Asset Servicing Portal
        </Typography>
        <div className={classes.grow} />
        <img alt="headerLogo" src={headerLogo} height="48px" />
        <div className={classes.grow} />
        <Box style={{ width: "90px" }}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography variant="body2">User: {user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Role: {role}</Typography>
            </Grid>
          </Grid>
        </Box>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={() => history.push("/apps")}
          className={classes.headerMenuButton}
        >
          <Apps classes={{ root: classes.headerIcon }} />
        </IconButton>
        {(setup || teardown) && <IconButton
          color="inherit"
          aria-haspopup="true"
          disabled={isInitializing}
          onClick={runScript}
          className={classes.headerMenuButton}
        >
          {!isInitialized && !isInitializing && <PlayArrow classes={{ root: classes.headerIcon }} />}
          {isInitialized && !isInitializing && <FastRewind classes={{ root: classes.headerIcon }} />}
          {isInitializing && <CircularProgress size={28} classes={{ root: classes.headerIcon }} />}
        </IconButton>}
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={() => signOut(userDispatch, history)}
        >
          <ExitToApp classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);