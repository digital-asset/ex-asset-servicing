import React, { useState } from "react";
import { useStreamQuery, useQuery, useLedger } from "@daml/react";
import { EquityStockSplit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/StockSplit";
import { EquityStock } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock";
import { EquityStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock/Lifecycle";
import { EquityOption } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { EquityOptionStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option/Lifecycle";
import { ACBRC } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { ACBRCStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC/Lifecycle";
import { Typography, Grid, Table, TableBody, TableCell, TableRow, TableHead, Button, CircularProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";

const StockSplit : React.FC = () => {
  const classes = useStyles();

  const [isLifecyclingStocks, setIsLifecyclingStocks] = useState(false);
  const [isLifecyclingOptions, setIsLifecyclingOptions] = useState(false);
  const [isLifecyclingAcbrcs, setIsLifecyclingAcbrcs] = useState(false);

  const { contractId } = useParams();
  const cid = contractId.replace("_", "#");

  const ledger = useLedger();
  const stockSplit = useQuery(EquityStockSplit).contracts.find(c => c.contractId === cid);
  const stocks = useStreamQuery(EquityStock, () => { return { id: { label: stockSplit?.payload.id.label } } }, [stockSplit]).contracts.slice().sort((a, b) => { return a.contractId < b.contractId ? -1 : 1; });;
  const options = useStreamQuery(EquityOption, () => { return { underlyingId: { label: stockSplit?.payload.id.label } } }, [stockSplit]).contracts.slice().sort((a, b) => { return a.contractId < b.contractId ? -1 : 1; });;
  const acbrcs = useStreamQuery(ACBRC, () => { return { underlyingId: { label: stockSplit?.payload.id.label } } }, [stockSplit]).contracts.slice().sort((a, b) => { return a.contractId < b.contractId ? -1 : 1; });;

  if (!stockSplit) return (null);

  const lifecycleStocks = async () => {
    setIsLifecyclingStocks(true);
    console.log(stockSplit.payload.id.signatories);
    await ledger.exerciseByKey(EquityStockSplitRule.EquityStockSplit_Lifecycle, stockSplit.payload.id.signatories, { stockSplitCid: stockSplit.contractId});
    setIsLifecyclingStocks(false);
  }

  const lifecycleOptions = async () => {
    setIsLifecyclingOptions(true);
    for (var i = 0; i < options.length; i++) {
      await ledger.exerciseByKey(EquityOptionStockSplitRule.EquityOptionStockSplit_Lifecycle, stockSplit.payload.id.signatories, { optionCid: options[i].contractId, stockSplitCid: stockSplit.contractId});
    }
    // const all = Promise.all(options.map(o =>
    //   lifecycleOption(stockSplit.payload.id.signatories, { optionCid: o.contractId, stockSplitCid: stockSplit.contractId})));
    // await all;
    setIsLifecyclingOptions(false);
  }

  const lifecycleAcbrcs = async () => {
    setIsLifecyclingAcbrcs(true);
    const all = Promise.all(acbrcs.map(a =>
      ledger.exerciseByKey(ACBRCStockSplitRule.ACBRCStockSplit_Lifecycle, stockSplit.payload.id.signatories, { acbrcCid: a.contractId, stockSplitCid: stockSplit.contractId})));
    await all;
    setIsLifecyclingAcbrcs(false);
  }

  return (
    <>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={10}>
              <Typography variant="h3" className={classes.heading}>Stocks</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" className={classes.buttonLifecycle} onClick={lifecycleStocks}>Lifecycle</Button>
            </Grid>
          </Grid>
          <Table size="small">
            <TableHead>
              <TableRow key={0} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Contract</TableCell>
                <TableCell key={1} className={classes.tableCell}>Label</TableCell>
                <TableCell key={2} className={classes.tableCell}>Currency</TableCell>
                <TableCell key={3} className={classes.tableCell}>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((s, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCell}>{s.contractId.substring(0, 8)}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{s.payload.id.label}</TableCell>
                  <TableCell key={2} className={classes.tableCell}>{s.payload.ccy.label}</TableCell>
                  <TableCell key={3} className={classes.tableCell}>
                    {isLifecyclingStocks ? (<CircularProgress size="10px"/>) : s.payload.id.version}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={10}>
              <Typography variant="h3" className={classes.heading}>Options</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" className={classes.buttonLifecycle} onClick={lifecycleOptions}>Lifecycle</Button>
            </Grid>
          </Grid>
          <Table size="small">
            <TableHead>
              <TableRow key={0} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Contract</TableCell>
                <TableCell key={1} className={classes.tableCell}>Label</TableCell>
                <TableCell key={2} className={classes.tableCell}>Underlying</TableCell>
                <TableCell key={3} className={classes.tableCell}>Type</TableCell>
                <TableCell key={4} className={classes.tableCell}>Strike</TableCell>
                <TableCell key={5} className={classes.tableCell}>Contract Size</TableCell>
                <TableCell key={6} className={classes.tableCell}>Expiry</TableCell>
                <TableCell key={7} className={classes.tableCell}>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {options.map((s, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCell}>{s.contractId.substring(0, 8)}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{s.payload.id.label}</TableCell>
                  <TableCell key={2} className={classes.tableCell}>{s.payload.underlyingId.label}</TableCell>
                  <TableCell key={3} className={classes.tableCell}>{s.payload.exerciseType}</TableCell>
                  <TableCell key={4} className={classes.tableCell}>{s.payload.strike}</TableCell>
                  <TableCell key={5} className={classes.tableCell}>{s.payload.contractSize}</TableCell>
                  <TableCell key={6} className={classes.tableCell}>{s.payload.maturity}</TableCell>
                  <TableCell key={7} className={classes.tableCell}>
                    {isLifecyclingOptions ? (<CircularProgress size="10px"/>) : s.payload.id.version}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={10}>
              <Typography variant="h3" className={classes.heading}>Structured Products</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" className={classes.buttonLifecycle} onClick={lifecycleAcbrcs}>Lifecycle</Button>
            </Grid>
          </Grid>
          <Table size="small">
            <TableHead>
              <TableRow key={0} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Contract</TableCell>
                <TableCell key={1} className={classes.tableCell}>Label</TableCell>
                <TableCell key={2} className={classes.tableCell}>Underlying</TableCell>
                <TableCell key={3} className={classes.tableCell}>Initial Fixing</TableCell>
                <TableCell key={4} className={classes.tableCell}>Knock-in Barrier</TableCell>
                <TableCell key={5} className={classes.tableCell}>Call Barrier</TableCell>
                <TableCell key={6} className={classes.tableCell}>Coupon</TableCell>
                <TableCell key={7} className={classes.tableCell}>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {acbrcs.map((s, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCell}>{s.contractId.substring(0, 8)}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{s.payload.id.label}</TableCell>
                  <TableCell key={2} className={classes.tableCell}>{s.payload.underlyingId.label}</TableCell>
                  <TableCell key={3} className={classes.tableCell}>{s.payload.initialFixing}</TableCell>
                  <TableCell key={4} className={classes.tableCell}>{s.payload.knockInBarrier}</TableCell>
                  <TableCell key={5} className={classes.tableCell}>{s.payload.callBarrier}</TableCell>
                  <TableCell key={6} className={classes.tableCell}>{s.payload.coupon}</TableCell>
                  <TableCell key={7} className={classes.tableCell}>
                    {isLifecyclingAcbrcs ? (<CircularProgress size="10px"/>) : s.payload.id.version}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default StockSplit;