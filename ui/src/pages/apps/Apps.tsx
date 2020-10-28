import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import caImage from "../../images/corporate-actions-app.jpg";
import ilImage from "../../images/instrument-lifecycling-app.jpg";
import pmImage from "../../images/position-management-app.jpg";
import { useUserState } from "../../context/UserContext";

export default function Apps({ history } : RouteComponentProps) {
  const classes = useStyles();
  // const user = useUserState();
  // const ledger = useLedger();
  // const depositoryRole

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item xs={6}>
            <Card className={classes.root}>
              <CardActionArea onClick={() => history.push("/apps/issuance")}>
                <CardMedia
                  className={classes.media}
                  image={caImage}
                  title="Issuance"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>
                    Issuance
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Manage the issuance workflow for securities
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.root}>
              <CardActionArea onClick={() => history.push("/apps/assetexplorer")}>
                <CardMedia
                  className={classes.media}
                  image={pmImage}
                  title="Asset Explorer"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>
                    Asset Explorer
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                    Manage assets and lifecycle events
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {/* {role === "BANK" && (
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/lifecycling")}>
                  <CardMedia
                    className={classes.media}
                    image={ilImage}
                    title="Lifecycle Management"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>
                      Instrument Lifecycling
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                      Lifecycle derivative and bond instruments
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )} */}
        </Grid>
      </Grid>
    </Grid>
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
