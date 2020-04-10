import React, { useState } from "react";
import { useStreamQuery, useQuery, useExerciseByKey } from "@daml/react";
import { EquityStock } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock";
import { EquityStockCashDividendRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock/Lifecycle";
import { Typography, Grid, Table, TableBody, TableCell, TableRow, TableHead, Button, CircularProgress } from "@material-ui/core";
import { RouteComponentProps, useParams } from "react-router-dom";
import { EquityCashDividend } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/CashDividend";
import useStyles from "./styles";

const Dividend : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const [isLifecyclingStocks, setIsLifecyclingStocks] = useState(false);

  const { contractId } = useParams();
  const cid = '#' + contractId;

  const dividend = useQuery(EquityCashDividend).contracts.find(c => c.contractId === cid);
  const lifecycleStock = useExerciseByKey(EquityStockCashDividendRule.EquityStockCashDividend_Lifecycle);
  const stocks = useStreamQuery(EquityStock, () => { return { id: { label: dividend?.payload.id.label } } }, [dividend]);

  if (!dividend) return (null);

  const lifecycleStocks = async () => {
    setIsLifecyclingStocks(true);
    console.log(dividend.payload.id.signatories);
    const entitlementIdLabel = "Dividend on " + dividend.payload.id.label;
    await lifecycleStock(dividend.payload.id.signatories, { dividendCid: dividend.contractId, entitlementIdLabel });
    setIsLifecyclingStocks(false);
  }

  return (
    <>
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
          {stocks.contracts.map((s, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{s.contractId}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{s.payload.id.label}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{s.payload.ccy.label}</TableCell>
              <TableCell key={3} className={classes.tableCell}>
                {isLifecyclingStocks ? (<CircularProgress size="10px"/>) : s.payload.id.version}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Dividend;