import React from "react";
import { useStreamQuery } from "@daml/react";
import { ACBRC } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { KeyboardArrowRight } from "@material-ui/icons";

const StockSplits : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const acbrcs = useStreamQuery(ACBRC).contracts;

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Label</TableCell>
          <TableCell key={1} className={classes.tableCell}>Underlying</TableCell>
          <TableCell key={2} className={classes.tableCell}>Initial Fixing</TableCell>
          <TableCell key={3} className={classes.tableCell}>Knock-in Barrier</TableCell>
          <TableCell key={4} className={classes.tableCell}>Call Barrier</TableCell>
          <TableCell key={5} className={classes.tableCell}>Coupon</TableCell>
          <TableCell key={6} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {acbrcs.map((a, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{a.payload.id.label}</TableCell>
            <TableCell key={1} className={classes.tableCell}>{a.payload.underlyingId.label}</TableCell>
            <TableCell key={2} className={classes.tableCell}>{a.payload.initialFixing}</TableCell>
            <TableCell key={3} className={classes.tableCell}>{+a.payload.knockInBarrier * 100}%</TableCell>
            <TableCell key={4} className={classes.tableCell}>{+a.payload.callBarrier * 100}%</TableCell>
            <TableCell key={5} className={classes.tableCell}>{+a.payload.coupon * 100}%</TableCell>
            <TableCell key={6} className={classes.tableCell}>
              <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/lifecycling/derivatives/" + a.contractId.substring(1))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(StockSplits);