import React from "react";
import { useLedger, useParty, useQuery, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { DepositInstruction, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ContractId } from "@daml/types";
import { Depository } from "@daml.js/asset-servicing-0.0.1/lib/Roles";

const DepositInstructions : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  const depositoryRoles = useQuery(Depository).contracts;
  const isDepository = depositoryRoles.length > 0 && depositoryRoles[0].payload.depository === party;
  const entries = useStreamQueries(DepositInstruction).contracts;
  const irs = useStreamQueries(WarrantIssuanceRequest).contracts;
  const settleDepositInstruction = async (depositInstructionCid : ContractId<DepositInstruction>, diLabel : string) => {
    const ir = irs.find(r => r.payload.issuanceData.label === diLabel);
    if (!ir || !isDepository) return;
    await ledger.exercise(Depository.SettleDepositInstruction, depositoryRoles[0].contractId, { issuanceRequestCid: ir.contractId, depositInstructionCid });
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Issuer</TableCell>
          <TableCell key={1} className={classes.tableCell}>Issuance</TableCell>
          <TableCell key={2} className={classes.tableCell}>Asset</TableCell>
          <TableCell key={3} className={classes.tableCell}>Quantity</TableCell>
          <TableCell key={4} className={classes.tableCell}>Account</TableCell>
          <TableCell key={5} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{e.payload.issuer}</TableCell>
            <TableCell key={1} className={classes.tableCell}>{e.payload.issuanceData.label}</TableCell>
            <TableCell key={2} className={classes.tableCell}>{e.payload.asset.id.label}</TableCell>
            <TableCell key={3} className={classes.tableCell}>{e.payload.asset.quantity}</TableCell>
            <TableCell key={4} className={classes.tableCell}>{e.payload.account.id.label}</TableCell>
            <TableCell key={5} className={classes.tableCell}>
              <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => settleDepositInstruction(e.contractId, e.payload.issuanceData.label)}>Settle</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(DepositInstructions);