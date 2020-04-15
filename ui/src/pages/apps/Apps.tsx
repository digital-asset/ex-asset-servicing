import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import caImage from "./entrepreneur-1340649_640.jpg";
import lcImage from "./stock-1863880_640.jpg";
import pfImage from "./business-1730089_640.jpg";
import { useUserState } from "../../context/UserContext";
import { getRole } from "../../config";

export default function Apps({ history } : RouteComponentProps) {
  const classes = useStyles();
  const user = useUserState();
  const isCsd = getRole(user.party) === "CSD";

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center" spacing={4}>
          {isCsd && (
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/corporateactions")}>
                  <CardMedia
                    className={classes.media}
                    image={caImage}
                    title="Corporate Action Management"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Corporate Action Management
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Manage various corporate actions on stocks
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
          {isCsd && (
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/lifecycling")}>
                  <CardMedia
                    className={classes.media}
                    image={lcImage}
                    title="Lifecycle Management"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Instrument Lifecycling
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lifecycle derivative and bond instruments
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
          {!isCsd && (
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/positions")}>
                  <CardMedia
                    className={classes.media}
                    image={pfImage}
                    title="Position Management"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Position Management
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Manage positions and lifecycle events
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
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
  },
  media: {
    height: 140,
  },
}));
