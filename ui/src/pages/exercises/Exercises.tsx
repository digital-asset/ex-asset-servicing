import React from "react";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { AssetDeposit } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Asset";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Chip } from "@material-ui/core";
import useStyles from "../styles";
import { Warrant } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ContractId } from "@daml/types";
import { WarrantExerciseRequest, WarrantExerciseRule } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Custody/Custody/module";
import { SettlementInstruction } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { CheckCircle, Help, KeyboardArrowRight, RadioButtonUnchecked, TrendingFlat } from "@material-ui/icons";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getName } from "../../config";

const Exercises : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
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
    const instructed = requests.length === 0 ? [] : sis.filter(si => si.payload.label === requests[0].payload.label && !si.payload.settled);
    const settled = requests.length === 0 ? [] : sis.filter(si => si.payload.label === requests[0].payload.label && si.payload.settled);
    const status = requests.length === 0
      ? "Exercise open"
      : (instructed.length === 0 && settled.length === 0
        ? "Exercise notices received"
        : (instructed.length > 0
          ? "Exercise instructed"
          : "Exercise settled"));
    return { contractId: warrant.contractId, warrant, instructed, settled, status, requests, totalQuantity };
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
            <TableCell key={0} className={classes.tableCell} align="center"><b>Issuer</b></TableCell>
            <TableCell key={1} className={classes.tableCell} align="center"><b>ISIN</b></TableCell>
            <TableCell key={2} className={classes.tableCell} align="right"><b>Exercise Notices</b></TableCell>
            <TableCell key={3} className={classes.tableCell} align="right"><b>Requested Quantity</b></TableCell>
            <TableCell key={4} className={classes.tableCell} align="center"><b>Status</b></TableCell>
            <TableCell key={5} className={classes.tableCell} align="center"><b>Workflow</b></TableCell>
            <TableCell key={6} className={classes.tableCell} align="center"><b>Action</b></TableCell>
            <TableCell key={7} className={classes.tableCell} align="center"><b>Details</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((e, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell} align="center">{getName(e.warrant.payload.issuer)}</TableCell>
              <TableCell key={1} className={classes.tableCell} align="center">{e.warrant.payload.id.label}</TableCell>
              <TableCell key={2} className={classes.tableCell} align="center">{e.requests.length}</TableCell>
              <TableCell key={3} className={classes.tableCell} align="center">{e.totalQuantity}</TableCell>
              <TableCell key={4} className={classes.tableCell} align="center">{e.status}</TableCell>
              <TableCell key={5} className={classes.tableCell} align="center">
                {e.requests.length === 0 && <><RadioButtonUnchecked /><TrendingFlat /></>}
                {e.requests.length > 0 && e.instructed.length === 0 && e.settled.length === 0 && <><Chip className={classes.chipYellow} size="small" label={e.requests.length}/><TrendingFlat /></>}
                {e.requests.length > 0 && e.instructed.length + e.settled.length > 0 && <><Chip className={classes.chipGreen} size="small" label={e.requests.length}/><TrendingFlat /></>}
                {e.instructed.length + e.settled.length === 0 && <RadioButtonUnchecked />}
                {e.instructed.length > 0 && <Help className={classes.yellow} />}
                {e.instructed.length === 0 && e.settled.length > 0 && <CheckCircle className={classes.green} />}
              </TableCell>
              <TableCell key={6} className={classes.tableCellButton}>
                <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" disabled={e.totalQuantity === 0 || e.instructed.length > 0 || e.settled.length > 0} onClick={() => instructExercise(e.warrant.payload, e.requests.map(c => c.contractId), e.totalQuantity)}>Instruct</Button>
              </TableCell>
              <TableCell key={7} className={classes.tableCell}>
              <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/assetcustody/exercises/" + e.contractId.replace("#", "_"))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default withRouter(Exercises);
