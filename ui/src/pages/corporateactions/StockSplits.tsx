import React from "react";
import { useStreamQuery } from "@daml/react";
import { EquityStockSplit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/StockSplit";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { KeyboardArrowRight } from "@material-ui/icons";

const StockSplits : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const stockSplits = useStreamQuery(EquityStockSplit).contracts;

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Underlying</TableCell>
          <TableCell key={1} className={classes.tableCell}>Ex-Date</TableCell>
          <TableCell key={2} className={classes.tableCell}>R-Factor</TableCell>
          <TableCell key={3} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stockSplits.map((d, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{d.payload.id.label}</TableCell>
            <TableCell key={1} className={classes.tableCell}>{d.payload.exDate}</TableCell>
            <TableCell key={2} className={classes.tableCell}>{d.payload.rFactor}</TableCell>
            <TableCell key={3} className={classes.tableCell}>
              <IconButton color="secondary" size="small" component="span" onClick={() => history.push("/apps/corporateactions/stocksplits/" + d.contractId.replace("#", "_"))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(StockSplits);