import React from "react";
import { useLedger, useParty, useQuery, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { ContractId } from "@daml/types";
import { Depository } from "@daml.js/dsp-0.0.1/lib/Roles";
import { SettlementInstruction } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { getName } from "../../config";

const SettlementInstructions : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  const depositoryRoles = useQuery(Depository).contracts;
  const isDepository = depositoryRoles.length > 0 && depositoryRoles[0].payload.depository === party;
  const entries = useStreamQueries(SettlementInstruction).contracts.filter(si => !si.payload.settled);

  const settleInstruction = async (instructionCid : ContractId<SettlementInstruction>) => {
    if (!isDepository) return;
    await ledger.exercise(SettlementInstruction.SettleInstruction, instructionCid, {});
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell} align="center"><b>From Party</b></TableCell>
          <TableCell key={1} className={classes.tableCell} align="center"><b>From Account</b></TableCell>
          <TableCell key={2} className={classes.tableCell} align="center"><b>To Party</b></TableCell>
          <TableCell key={3} className={classes.tableCell} align="center"><b>To Account</b></TableCell>
          <TableCell key={4} className={classes.tableCell} align="right"><b>Quantity</b></TableCell>
          <TableCell key={5} className={classes.tableCell} align="center"><b>Asset</b></TableCell>
          <TableCell key={6} className={classes.tableCell} align="center"><b>Action</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell} align="center">{getName(e.payload.fromDeposit.account.owner)}</TableCell>
            <TableCell key={1} className={classes.tableCell} align="center">{e.payload.fromDeposit.account.id.label}</TableCell>
            <TableCell key={2} className={classes.tableCell} align="center">{getName(e.payload.toAccount.owner)}</TableCell>
            <TableCell key={3} className={classes.tableCell} align="center">{e.payload.toAccount.id.label}</TableCell>
            <TableCell key={4} className={classes.tableCell} align="right">{e.payload.fromDeposit.asset.quantity}</TableCell>
            <TableCell key={5} className={classes.tableCell} align="center">{e.payload.fromDeposit.asset.id.label}</TableCell>
            <TableCell key={6} className={classes.tableCell}>
              <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => settleInstruction(e.contractId)}>Settle</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(SettlementInstructions);