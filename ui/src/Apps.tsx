import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import caImage from "./images/corporate-actions-app.jpg";
import ilImage from "./images/instrument-lifecycling-app.jpg";
import pmImage from "./images/position-management-app.jpg";
import Header from "./components/Header/Header";
// import { useParty, useQuery } from "@daml/react";
// import { Issuer, Agent, Depository } from "@daml.js/asset-servicing-0.0.1/lib/Roles";

export default function Apps({ history } : RouteComponentProps) {
  const classes = useStyles();
  // const party = useParty();
  // const depositories = useQuery(Depository).contracts;
  // const isDepository = depositories.length > 0 && depositories[0].payload.depository === party;
  // const agents = useQuery(Agent).contracts;
  // const isAgent = agents.length > 0 && agents[0].payload.agent === party;
  // const issuers = useQuery(Issuer).contracts;
  // const isIssuer = issuers.length > 0 && issuers[0].payload.issuer === party;

  return (
    <>
      <Header app="Portal" isInitialized={true} />
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" spacing={10}>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/assetissuance")}>
                  <CardMedia className={classes.media} image={caImage} title="Issuance" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>Issuance</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>Manage issuances for digital securities</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/assetdistribution")}>
                  <CardMedia className={classes.media} image={pmImage} title="Distribution" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>Distribution</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>Manage primary distribution of issuances</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/assetcustody")}>
                  <CardMedia className={classes.media} image={ilImage} title="Custody" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>Custody</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>Manage asset custody and lifecycle events</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme : any) => createStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
    marginTop: 200,
    backgroundColor: theme.palette.primary.main, //"#00565f",
  },
  media: {
    height: 140,
  },
  cardText: {
    color: "white",
  },
}));
