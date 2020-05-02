import React from "react";
import { useStreamQuery } from "@daml/react";
import { EquityCashDividend } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/CashDividend";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { KeyboardArrowRight } from "@material-ui/icons";

const Dividends : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const dividends = useStreamQuery(EquityCashDividend).contracts;
  
  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Underlying</TableCell>
          <TableCell key={1} className={classes.tableCell}>Ex-Date</TableCell>
          <TableCell key={2} className={classes.tableCell}>Settlement Date</TableCell>
          <TableCell key={3} className={classes.tableCell}>Distribution per Share</TableCell>
          <TableCell key={4} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dividends.map((d, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{d.payload.id.label}</TableCell>
            <TableCell key={1} className={classes.tableCell}>{d.payload.exDate}</TableCell>
            <TableCell key={2} className={classes.tableCell}>{d.payload.settlementDate}</TableCell>
            <TableCell key={3} className={classes.tableCell}>{d.payload.perShare}</TableCell>
            <TableCell key={4} className={classes.tableCell}>
            <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/corporateactions/dividends/" + d.contractId.replace("#", "_"))}>
              <KeyboardArrowRight fontSize="small"/>
            </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default withRouter(Dividends);