import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Apps from "@material-ui/icons/Apps";
import PlayArrow from "@material-ui/icons/PlayArrow";
import FastRewind from "@material-ui/icons/FastRewind";
import { useParty, useQuery } from "@daml/react";
import { Agent, Depository, Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import useStyles from "./styles";
import headerLogo from "../../images/headerLogo.png";
import { useUserDispatch, signOut } from "../../context/UserContext";

interface HeaderProps {
  app : string
  isInitialized : boolean
  setup? : () => Promise<void>
  teardown? : () => Promise<void>
}

function Header({ history, app, isInitialized, setup, teardown } : RouteComponentProps & HeaderProps) {
  const classes = useStyles();
  const party = useParty();
  const depositoryRoles = useQuery(Depository).contracts;
  const isDepository = depositoryRoles.length > 0 && depositoryRoles[0].payload.depository === party;
  const agentRoles = useQuery(Agent).contracts;
  const isAgent = agentRoles.length > 0 && agentRoles[0].payload.agent === party;
  const issuerRoles = useQuery(Issuer).contracts;
  const isIssuer = issuerRoles.length > 0 && issuerRoles[0].payload.issuer === party;
  const role = isDepository ? "Depository" : (isAgent ? "Agent" : (isIssuer ? "Issuer" : "Investor"));

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
        <img alt="headerLogo" src={headerLogo} height="48px" />
        <div className={classes.grow} />
        <Box alignContent="center">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
            <Typography variant="h1" className={classes.logotype}>DIGITAL SECURITIES PLATFORM</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "white" }}>{app}</Typography>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.grow} />
        <Box className={classes.userBox} style={{ width: "120px" }}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}><Typography variant="caption">{party}</Typography></Grid>
            <Grid item xs={12}><Typography variant="caption">({role})</Typography></Grid>
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