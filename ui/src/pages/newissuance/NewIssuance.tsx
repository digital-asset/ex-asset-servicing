import React from "react";
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/styles";
import warrantImage from "../../images/warrant.jpg";
import acbrcImage from "../../images/structured-products.jpg";

const NewIssuance : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/assetissuance/newissuance/newwarrant")}>
                  <CardMedia className={classes.media} image={warrantImage} title="Warrant" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>Warrant</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>Issue new warrants</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={() => history.push("/apps/assetissuance/newissuance/newacbrc")}>
                  <CardMedia className={classes.media} image={acbrcImage} title="Autocallable BRC" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardText}>Autocallable BRC</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>Issue new autocallable barrier reverse convertibles</Typography>
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

export default withRouter(NewIssuance);