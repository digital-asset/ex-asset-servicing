import React from "react";
import { useLedger, useParty, useQuery, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton, Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { Cancel, CheckCircle, Help, KeyboardArrowRight, RadioButtonUnchecked, TrendingFlat } from "@material-ui/icons";
import { AdmissionCheckRequest, AdmissionCheckResponse, CodeAllocationRequest, CodeAllocationResponse, GlobalNotesRequest, GlobalNotesResponse, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ContractId } from "@daml/types";
import { Agent, Depository } from "@daml.js/asset-servicing-0.0.1/lib/Roles";

const Issuances : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const party = useParty();
  const ledger = useLedger();
  const depositoryRoles = useQuery(Depository).contracts;
  const isDepository = depositoryRoles.length > 0 && depositoryRoles[0].payload.depository === party;
  const agentRoles = useQuery(Agent).contracts;
  const isAgent = agentRoles.length > 0 && agentRoles[0].payload.agent === party;
  const irs = useStreamQueries(WarrantIssuanceRequest).contracts;
  const acreqs = useStreamQueries(AdmissionCheckRequest).contracts;
  const acress = useStreamQueries(AdmissionCheckResponse).contracts;
  const careqs = useStreamQueries(CodeAllocationRequest).contracts;
  const caress = useStreamQueries(CodeAllocationResponse).contracts;
  const gnreqs = useStreamQueries(GlobalNotesRequest).contracts;
  const gnress = useStreamQueries(GlobalNotesResponse).contracts;

  const entries = irs.map(ir => {
    const data = ir.payload.issuanceData;
    const acreq = acreqs.find(acreq => acreq.payload.issuanceData.label === data.label);
    const acres = acress.find(acres => acres.payload.issuanceData.label === data.label);
    const careq = careqs.find(careq => careq.payload.issuanceData.label === data.label);
    const cares = caress.find(cares => cares.payload.issuanceData.label === data.label);
    const gnreq = gnreqs.find(gnreq => gnreq.payload.issuanceData.label === data.label);
    const gnres = gnress.find(gnres => gnres.payload.issuanceData.label === data.label);
    const status = !!gnres
      ? (gnres.payload.success ? "Global notes setup completed" : "Global notes setup rejected")
      : (!!gnreq
        ? "Global notes setup requested"
        : (!!cares
          ? "Code allocation completed"
          : (!!careq
            ? "Code allocation requested"
            : (!!acres
              ? (acres.payload.admissionCheck.parties && acres.payload.admissionCheck.product && acres.payload.admissionCheck.legalDocs ? "Admission check completed" : "Admission check rejected")
              : (!!acreq
                ? "Admission check requested"
                : "Product configuration completed")))));
    return { contractId: ir.contractId, type: "Warrant", data, status, acreq, acres, careq, cares, gnreq, gnres, }
  });

  const requestAdmissionCheck = async (issuanceRequestCid : ContractId<WarrantIssuanceRequest>) => {
    if (!isAgent) return;
    await ledger.exercise(Agent.RequestAdmissionCheck, agentRoles[0].contractId, { issuanceRequestCid });
  };

  const requestCodeAllocation = async (issuanceRequestCid : ContractId<WarrantIssuanceRequest>, admissionCheckResponseCid : ContractId<AdmissionCheckResponse>) => {
    if (!isAgent) return;
    await ledger.exercise(Agent.RequestCodeAllocation, agentRoles[0].contractId, { issuanceRequestCid, admissionCheckResponseCid });
  };

  const requestGlobalNotes = async (issuanceRequestCid : ContractId<WarrantIssuanceRequest>, admissionCheckResponseCid : ContractId<AdmissionCheckResponse>, codeAllocationResponseCid : ContractId<CodeAllocationResponse>) => {
    if (!isAgent) return;
    await ledger.exercise(Agent.RequestGlobalNotes, agentRoles[0].contractId, { issuanceRequestCid, admissionCheckResponseCid, codeAllocationResponseCid });
  };

  const dispatchDepositInstruction = async (issuanceRequestCid : ContractId<WarrantIssuanceRequest>, admissionCheckResponseCid : ContractId<AdmissionCheckResponse>, codeAllocationResponseCid : ContractId<CodeAllocationResponse>, globalNotesResponseCid : ContractId<GlobalNotesResponse>) => {
    if (!isDepository) return;
    const args = {
      issuanceRequestCid,
      admissionCheckResponseCid,
      codeAllocationResponseCid,
      globalNotesResponseCid,
      issuanceAccount: agentRoles[0].payload.issuanceAccount,
      distributionAccount: agentRoles[0].payload.distributionAccount
    };
    await ledger.exercise(Depository.HandleIssuanceRequest, depositoryRoles[0].contractId, args);
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell} align="center"><b>Issuance</b></TableCell>
          <TableCell key={1} className={classes.tableCell} align="center"><b>Type</b></TableCell>
          <TableCell key={2} className={classes.tableCell} align="center"><b>Status</b></TableCell>
          <TableCell key={3} className={classes.tableCell} align="center"><b>Workflow</b></TableCell>
          <TableCell key={4} className={classes.tableCell} align="center" style={{ width: "220px" }}><b>Action</b></TableCell>
          <TableCell key={5} className={classes.tableCell} align="center"><b>Details</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell} align="center">{e.data.label}</TableCell>
            <TableCell key={1} className={classes.tableCell} align="center">{e.type}</TableCell>
            <TableCell key={2} className={classes.tableCell} align="center">{e.status}</TableCell>
            <TableCell key={3} className={classes.tableCell} align="center">
              {!e.acreq && !e.acres && <><RadioButtonUnchecked className={classes.default} /><TrendingFlat /></>}
              {!!e.acreq && !e.acres && <><Help className={classes.yellow} /><TrendingFlat /></>}
              {!e.acreq && !!e.acres && e.acres.payload.admissionCheck.parties && e.acres.payload.admissionCheck.product && e.acres.payload.admissionCheck.legalDocs && <><CheckCircle className={classes.green} /><TrendingFlat /></>}
              {!e.acreq && !!e.acres && (!e.acres.payload.admissionCheck.parties || !e.acres.payload.admissionCheck.product || !e.acres.payload.admissionCheck.legalDocs) && <><Cancel className={classes.red} /><TrendingFlat /></>}
              {!e.careq && !e.cares && <><RadioButtonUnchecked className={classes.default} /><TrendingFlat /></>}
              {!!e.careq && !e.cares && <><Help className={classes.yellow} /><TrendingFlat /></>}
              {!e.careq && !!e.cares && <><CheckCircle className={classes.green} /><TrendingFlat /></>}
              {!e.gnreq && !e.gnres && <RadioButtonUnchecked className={classes.default} />}
              {!!e.gnreq && !e.gnres && <Help className={classes.yellow} />}
              {!e.gnreq && !!e.gnres && e.gnres.payload.success && <CheckCircle className={classes.green} />}
              {!e.gnreq && !!e.gnres && !e.gnres.payload.success && <Cancel className={classes.red} />}
            </TableCell>
            <TableCell key={4} className={classes.tableCell} align="center">
              {!e.acreq && !e.acres && isAgent && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => requestAdmissionCheck(e.contractId)}>Admission Check</Button>}
              {!e.careq && !e.cares && e.acres && isAgent && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => requestCodeAllocation(e.contractId, e.acres!.contractId)}>Code Allocation</Button>}
              {!e.gnreq && !e.gnres && e.cares && isAgent && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => requestGlobalNotes(e.contractId, e.acres!.contractId, e.cares!.contractId)}>Global Notes Setup</Button>}
              {isDepository && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" disabled={!e.acres || !e.cares || !e.gnres || !e.gnres.payload.success} onClick={() => dispatchDepositInstruction(e.contractId, e.acres!.contractId, e.cares!.contractId, e.gnres!.contractId)}>Issue</Button>}
            </TableCell>
            <TableCell key={5} className={classes.tableCell} align="center">
              <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/assetissuance/issuances/" + e.contractId.replace("#", "_"))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(Issuances);