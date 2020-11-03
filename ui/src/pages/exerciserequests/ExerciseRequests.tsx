import React from "react";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import useStyles from "../styles";
import { Warrant } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ContractId } from "@daml/types";
import { WarrantExerciseRequest, WarrantExerciseRule } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Custody/Custody/module";
import { SettlementInstruction } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Distribution/Distribution";

const ExerciseRequests : React.FC = () => {
  const classes = useStyles();

  const party = useParty();
  const ledger = useLedger();
  const ads = useStreamQueries(AssetDeposit).contracts;
  const exerciseRules = useStreamQueries(WarrantExerciseRule).contracts;
  const warrants = useStreamQueries(Warrant).contracts;
  const ers = useStreamQueries(WarrantExerciseRequest).contracts;
  const sis = useStreamQueries(SettlementInstruction).contracts;
  const entries = warrants.map(warrant => {
    const requests = ers.filter(er => er.payload.warrant.id.label === warrant.payload.id.label);
    const totalQuantity = requests.map(r => parseInt(r.payload.quantity)).reduce((a, b) => a + b, 0);
    const instructed = requests.length === 0 ? false : sis.filter(si => si.payload.label === requests[0].payload.label).length > 0;
    return { warrant, exerciseRequests: requests.map(r => r.contractId), totalQuantity, instructed };
  });

  const instructExercise = async (warrant : Warrant, exerciseRequestCids : ContractId<WarrantExerciseRequest>[], totalQuantity: number) => {
    const stockDeposit = ads.find(ad => ad.payload.asset.id.label === warrant.terms.underlying.label && ad.payload.account.owner === warrant.issuer);
    const warrantDeposit = ads.find(ad => ad.payload.asset.id.label === warrant.id.label && ad.payload.account.owner === party);
    if (exerciseRules.length === 0 || !stockDeposit || !warrantDeposit) return;
    if (totalQuantity > parseInt(warrantDeposit.payload.asset.quantity)) {
      const [[ splitDepositCid, ] ] = await ledger.exercise(AssetDeposit.AssetDeposit_Split, warrantDeposit.contractId, { quantities: [ totalQuantity.toFixed(0) ] });
      await ledger.exercise(WarrantExerciseRule.InstructWarrantExercise, exerciseRules[0].contractId, { exerciseRequestCids, issuerStockDepositCid: stockDeposit.contractId, warrantDepositCid: splitDepositCid });
    } else {
      await ledger.exercise(WarrantExerciseRule.InstructWarrantExercise, exerciseRules[0].contractId, { exerciseRequestCids, issuerStockDepositCid: stockDeposit.contractId, warrantDepositCid: warrantDeposit.contractId });
    }
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
            <TableCell key={6} className={classes.tableCell} align="right"><b>Exercises</b></TableCell>
            <TableCell key={7} className={classes.tableCell} align="right"><b>Requested Quantity</b></TableCell>
            <TableCell key={8} className={classes.tableCell} align="center"></TableCell>
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
              <TableCell key={5} className={classes.tableCell} align="center">{e.warrant.payload.terms.contractSize}</TableCell>
              <TableCell key={6} className={classes.tableCell} align="center">{e.exerciseRequests.length}</TableCell>
              <TableCell key={7} className={classes.tableCell} align="center">{e.totalQuantity}</TableCell>
              <TableCell key={8} className={classes.tableCellButton}>
                <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" disabled={e.totalQuantity === 0 || e.instructed} onClick={() => instructExercise(e.warrant.payload, e.exerciseRequests, e.totalQuantity)}>Instruct</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ExerciseRequests;
