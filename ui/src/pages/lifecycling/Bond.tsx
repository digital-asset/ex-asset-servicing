import React, { useState } from "react";
import { useStreamQuery, useExerciseByKey } from "@daml/react";
import { Bond as BondT } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond";
import { BondCouponRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond/Lifecycle";
import { Typography, Grid, Table, TableBody, TableCell, TableRow, Button, CircularProgress } from "@material-ui/core";
import { useParams, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";

const Bond : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const [isLifecyclingBond, setIsLifecyclingBond] = useState(false);

  const { contractId } = useParams();
  const cid = '#' + contractId;
  const bond = useStreamQuery(BondT).contracts.find(c => c.contractId === cid);
  const lifecycleBond = useExerciseByKey(BondCouponRule.BondCoupon_Lifecycle);

  if (!bond) return (null);

  const payCoupon = async () => {
    setIsLifecyclingBond(true);
    const result = await lifecycleBond(bond.payload.id.signatories, { bondCid: bond.contractId });
    history.push("/apps/lifecycling/bonds/" + result._1.substring(1));
    setIsLifecyclingBond(false);
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={1}>
              <Typography variant="h3" className={classes.heading}>Details</Typography>
            </Grid>
            <Grid item xs={11}>
              <Table size="small">
                <TableBody>
                  <TableRow key={0} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Contract</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{bond.contractId}</TableCell>
                  </TableRow>
                  <TableRow key={1} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Label</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{bond.payload.id.label}</TableCell>
                  </TableRow>
                  <TableRow key={2} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Currency</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{bond.payload.currencyId.label}</TableCell>
                  </TableRow>
                  <TableRow key={3} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Coupon</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{bond.payload.coupon}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={1}>
              <Typography variant="h3" className={classes.heading}>Coupon</Typography>
            </Grid>
            <Grid item xs={11}>
              <Table size="small">
                <TableBody>
                  {bond.payload.couponDates.map((d, i) => (
                    <TableRow key={i} className={classes.tableRow}>
                      <TableCell key={0} className={classes.tableCell}>{d}</TableCell>
                      <TableCell key={1} className={classes.tableCell}>{bond.payload.coupon}</TableCell>
                      <TableCell key={2} className={classes.tableCell}>
                        {i === +bond.payload.couponIdx && (
                          (isLifecyclingBond ? (<CircularProgress size="10px"/>) : (<Button variant="contained" color="primary" size="small" className={classes.buttonLifecycle} onClick={payCoupon}>Pay</Button>))
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Bond;