import React from "react";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import useStyles from "../styles";
import { Warrant } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ContractId } from "@daml/types";
import { WarrantExerciseRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Custody/Custody/module";

const Warrants : React.FC = () => {
  const classes = useStyles();

  const party = useParty();
  const ledger = useLedger();
  const ads = useStreamQueries(AssetDeposit).contracts;
  const warrants = useStreamQueries(Warrant).contracts;
  const ers = useStreamQueries(WarrantExerciseRequest).contracts;
  const entries = ads.filter(deposit => !!warrants.find(w => w.payload.id.label === deposit.payload.asset.id.label)).map(deposit => {
    const warrant = warrants.find(w => w.payload.id.label === deposit.payload.asset.id.label)!;
    const request = ers.find(er => er.payload.warrant.id.label === deposit.payload.asset.id.label);
    return { deposit, warrant, requested: !!request }
  });

  const exerciseWarrant = async (warrantDepositCid : ContractId<AssetDeposit>, warrantDeposit : AssetDeposit, warrant : Warrant) => {
    const cashDeposit = ads.find(ad => ad.payload.asset.id.label === "EUR");
    if (!cashDeposit) return;
    const args = {
      agent: warrantDeposit.account.provider,
      investor: party,
      label: "EXER-" + warrant.issuer + "-" + warrant.id.label,
      warrant,
      quantity: warrantDeposit.asset.quantity,
      warrantDepositCid,
      cashDepositCid: cashDeposit.contractId,
      settled: false
    };
    await ledger.create(WarrantExerciseRequest, args);
  };
  
  return (
    <>
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell} align="center"><b>Underlying</b></TableCell>
            <TableCell key={1} className={classes.tableCell} align="center"><b>Option Type</b></TableCell>
            <TableCell key={2} className={classes.tableCell} align="center"><b>Strike</b></TableCell>
            <TableCell key={3} className={classes.tableCell} align="center"><b>Expiry</b></TableCell>
            <TableCell key={4} className={classes.tableCell} align="center"><b>Exercise Type</b></TableCell>
            <TableCell key={5} className={classes.tableCell} align="right"><b>Contract Size</b></TableCell>
            <TableCell key={6} className={classes.tableCell} align="right"><b>Position</b></TableCell>
            <TableCell key={7} className={classes.tableCell} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((e, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell} align="center">{e.warrant.payload.terms.underlying.label}</TableCell>
              <TableCell key={1} className={classes.tableCell} align="center">{e.warrant.payload.terms.optionType}</TableCell>
              <TableCell key={2} className={classes.tableCell} align="center">{e.warrant.payload.terms.strike}</TableCell>
              <TableCell key={3} className={classes.tableCell} align="center">{e.warrant.payload.terms.expiry}</TableCell>
              <TableCell key={4} className={classes.tableCell} align="center">{e.warrant.payload.terms.exerciseType}</TableCell>
              <TableCell key={5} className={classes.tableCell} align="right">{e.warrant.payload.terms.contractSize}</TableCell>
              <TableCell key={6} className={classes.tableCell} align="right">{e.deposit.payload.asset.quantity}</TableCell>
              <TableCell key={7} className={classes.tableCellButton}>
                {!e.requested && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => exerciseWarrant(e.deposit.contractId, e.deposit.payload, e.warrant.payload)}>Exercise</Button>}
                {e.requested && "Exercise requested"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Warrants;
