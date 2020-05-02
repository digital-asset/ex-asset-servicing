import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Grid, Box } from "@material-ui/core";
import { ExitToApp, Apps } from "@material-ui/icons";
import useStyles from "./styles";
import { useUserDispatch, signOut, useUserState } from "../../context/UserContext";
import { getRole } from "../../config";
import headerLogo from "../../images/headerLogo.png";

function Header({ history } : RouteComponentProps) {
  const classes = useStyles();

  // global
  const user = useUserState();
  const isCsd = getRole(user.party) === "CSD";
  const userDispatch = useUserDispatch();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logotype}>
          Asset Servicing Portal
        </Typography>
        <div className={classes.grow} />
        <img alt="headerLogo" src={headerLogo} height="32px" />
        <div className={classes.grow} />
        <Box style={{ width: "80px" }}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography variant="body2">User: {user.party}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Role: {isCsd ? "CSD" : "BANK"}</Typography>
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