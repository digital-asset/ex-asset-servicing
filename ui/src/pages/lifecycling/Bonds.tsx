import React from "react";
import { useStreamQuery } from "@daml/react";
import { Bond } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { KeyboardArrowRight } from "@material-ui/icons";

const Bonds : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {

  const bonds = useStreamQuery(Bond).contracts;

  const classes = useStyles();
  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Label</TableCell>
          <TableCell key={1} className={classes.tableCell}>Currency</TableCell>
          <TableCell key={2} className={classes.tableCell}>Next Payment Date</TableCell>
          <TableCell key={3} className={classes.tableCell}>Amount</TableCell>
          <TableCell key={4} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bonds.map((d, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{d.payload.id.label}</TableCell>
            <TableCell key={1} className={classes.tableCell}>{d.payload.currencyId.label}</TableCell>
            <TableCell key={2} className={classes.tableCell}>{d.payload.couponDates[+d.payload.couponIdx]}</TableCell>
            <TableCell key={3} className={classes.tableCell}>{(+d.payload.couponIdx === d.payload.couponDates.length - 1 ? (1 + (+d.payload.coupon)) * 100 : +d.payload.coupon * 100).toFixed(2)}%</TableCell>
            <TableCell key={4} className={classes.tableCell}>
            <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/lifecycling/bonds/" + d.contractId.replace("#", "_"))}>
              <KeyboardArrowRight fontSize="small"/>
            </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(Bonds);