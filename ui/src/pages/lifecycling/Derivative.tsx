import React, { useState } from "react";
import { useStreamQuery, useLedger } from "@daml/react";
import { ACBRC } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { ACBRCFixingRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC/Lifecycle";
import { Typography, Grid, Table, TableBody, TableCell, TableRow, Button, CircularProgress } from "@material-ui/core";
import { useParams, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { Fixing } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/RefData/Fixing";
import { ContractId } from "@daml/types";
import { KeyboardArrowRight } from "@material-ui/icons";

const Derivative : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const [isLifecyclingAcbrc, setIsLifecyclingAcbrc] = useState(false);

  const { contractId } = useParams();
  const cid = contractId.replace("_", "#");
  
  const ledger = useLedger();
  const acbrc = useStreamQuery(ACBRC).contracts.find(c => c.contractId === cid);
  const allFixings = useStreamQuery(Fixing).contracts;
  const fixings = allFixings.filter(f => acbrc && f.payload.id.label === acbrc.payload.underlyingId.label && f.payload.id.version === acbrc.payload.underlyingId.version);
  console.log(fixings);
  const fixingValues = acbrc?.payload.fixingDates.map(d => {
    const fixing = fixings.find(f => f.payload.date === d);
    return { contractId: fixing?.contractId, date: d, value: fixing?.payload.value }
  });

  if (!acbrc || !fixingValues) return (null);

  const applyFixing = async (fixingCid : ContractId<Fixing> | undefined) => {
    setIsLifecyclingAcbrc(true);
    if (fixingCid) {
      const [result, ] = await ledger.exerciseByKey(ACBRCFixingRule.ACBRCFixing_Lifecycle, acbrc.payload.id.signatories, { acbrcCid: acbrc.contractId, fixingCid });
      history.push("/apps/lifecycling/derivatives/" + result._1.replace("#", "_"));
    }
    setIsLifecyclingAcbrc(false);
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
                    <TableCell key={1} className={classes.tableCell}>{acbrc.contractId.substring(0, 8)}</TableCell>
                  </TableRow>
                  <TableRow key={1} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Label</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{acbrc.payload.id.label}</TableCell>
                  </TableRow>
                  <TableRow key={2} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Underlying</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{acbrc.payload.underlyingId.label}</TableCell>
                  </TableRow>
                  <TableRow key={3} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Initial Fixing</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{acbrc.payload.initialFixing}</TableCell>
                  </TableRow>
                  <TableRow key={4} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Knock-in Barrier</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{+acbrc.payload.knockInBarrier * 100}%</TableCell>
                  </TableRow>
                  <TableRow key={5} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Knock-in Barrier Hit?</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{String(acbrc.payload.knockInBarrierHit)}</TableCell>
                  </TableRow>
                  <TableRow key={6} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Call Barrier</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{+acbrc.payload.callBarrier * 100}%</TableCell>
                  </TableRow>
                  <TableRow key={7} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Call Barrier Hit?</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{String(acbrc.payload.callBarrierHit)}</TableCell>
                  </TableRow>
                  <TableRow key={8} className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}>Coupon</TableCell>
                    <TableCell key={1} className={classes.tableCell}>{+acbrc.payload.coupon * 100}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={1}>
              <Typography variant="h3" className={classes.heading}>Fixings</Typography>
            </Grid>
            <Grid item xs={11}>
              <Table size="small">
                <TableBody>
                  {fixingValues.map((f, i) => (
                    <TableRow key={i} className={classes.tableRow}>
                      <TableCell key={0} className={classes.tableCell} style={{ width: "10px" }}>{i === +acbrc.payload.fixingIdx ? (<KeyboardArrowRight />) : (null)}</TableCell>
                      <TableCell key={1} className={classes.tableCell}>{f.date}</TableCell>
                      {i <= +acbrc.payload.fixingIdx && <TableCell key={2} className={classes.tableCell}>{f.value}</TableCell>}
                      <TableCell key={3} className={classes.tableCell} style={{ width: "100px" }}>
                        {i === +acbrc.payload.fixingIdx && f.value && (
                          (isLifecyclingAcbrc ? (<CircularProgress size="10px"/>) : (<Button variant="contained" color="primary" size="small" className={classes.buttonLifecycle} onClick={() => applyFixing(f.contractId)}>Apply</Button>))
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

export default Derivative;