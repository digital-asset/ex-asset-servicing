import React from "react";
import { useLedger, useQuery, useStreamQuery } from "@daml/react";
import { ACBRC } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton, Chip, Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { CheckCircle, CheckCircleOutlined, HelpOutline, HighlightOff, KeyboardArrowRight } from "@material-ui/icons";
import { AdmissionCheckRequest, AdmissionCheckResponse, Agent, CodeAllocationRequest, CodeAllocationResponse, GlobalNotesRequest, GlobalNotesResponse, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ContractId } from "@daml/types";

const Warrants : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const ledger = useLedger();
  const agentRoles = useQuery(Agent).contracts;
  const isAgent = agentRoles.length > 0;
  const irs = useStreamQuery(WarrantIssuanceRequest).contracts;
  const acreqs = useStreamQuery(AdmissionCheckRequest).contracts;
  const acress = useStreamQuery(AdmissionCheckResponse).contracts;
  const careqs = useStreamQuery(CodeAllocationRequest).contracts;
  const caress = useStreamQuery(CodeAllocationResponse).contracts;
  const gnreqs = useStreamQuery(GlobalNotesRequest).contracts;
  const gnress = useStreamQuery(GlobalNotesResponse).contracts;
  const entries = irs.map(ir => {
    const data = ir.payload.issuanceData;
    return {
      contractId: ir.contractId,
      data,
      acreq: acreqs.find(acreq => acreq.payload.issuanceData.label === data.label),
      acres: acress.find(acres => acres.payload.issuanceData.label === data.label),
      careq: careqs.find(careq => careq.payload.issuanceData.label === data.label),
      cares: caress.find(cares => cares.payload.issuanceData.label === data.label),
      gnreq: gnreqs.find(gnreq => gnreq.payload.issuanceData.label === data.label),
      gnres: gnress.find(gnres => gnres.payload.issuanceData.label === data.label),
    }
  });

  const requestAdmissionCheck = async (issuanceRequestCid : ContractId<WarrantIssuanceRequest>) => {
    if (!isAgent) return;
    await ledger.exercise(Agent.RequestAdmissionCheck, agentRoles[0].contractId, { issuanceRequestCid });
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Label</TableCell>
          <TableCell key={1} className={classes.tableCell}>Security Admission</TableCell>
          <TableCell key={2} className={classes.tableCell}>Code Allocation</TableCell>
          <TableCell key={3} className={classes.tableCell}>Global Notes</TableCell>
          <TableCell key={4} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{e.data.label}</TableCell>
            <TableCell key={1} className={classes.tableCell}>
              {!e.acreq && !e.acres && !isAgent && <CheckCircleOutlined fontSize="small" />}
              {!e.acreq && !e.acres && isAgent && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => requestAdmissionCheck(e.contractId)}>Request</Button>}
              {!!e.acreq && !e.acres && <HelpOutline fontSize="small" />}
              {!e.acreq && !!e.acres && e.acres.payload.admissionCheck.parties && <CheckCircle fontSize="small" />}
              {!e.acreq && !!e.acres && !e.acres.payload.admissionCheck.parties && <HighlightOff fontSize="small" />}
              {!e.acreq && !!e.acres && e.acres.payload.admissionCheck.product && <CheckCircle fontSize="small" />}
              {!e.acreq && !!e.acres && !e.acres.payload.admissionCheck.product && <HighlightOff fontSize="small" />}
              {!e.acreq && !!e.acres && e.acres.payload.admissionCheck.legalDocs && <CheckCircle fontSize="small" />}
              {!e.acreq && !!e.acres && !e.acres.payload.admissionCheck.legalDocs && <HighlightOff fontSize="small" />}
            </TableCell>
            <TableCell key={2} className={classes.tableCell}>
              {!e.careq && !e.cares && <CheckCircleOutlined fontSize="small" />}
              {!!e.careq && !e.cares && <HelpOutline fontSize="small" />}
              {!e.careq && !!e.cares && <CheckCircle fontSize="small" />}
            </TableCell>
            <TableCell key={3} className={classes.tableCell}>
              {!e.gnreq && !e.gnres && <CheckCircleOutlined fontSize="small" />}
              {!!e.gnreq && !e.gnres && <HelpOutline fontSize="small" />}
              {!e.gnreq && !!e.gnres && e.gnres.payload.success && <CheckCircle fontSize="small" />}
              {!e.gnreq && !!e.gnres && !e.gnres.payload.success && <HighlightOff fontSize="small" />}
            </TableCell>
            <TableCell key={4} className={classes.tableCell}>
              <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/issuance/warrants/" + e.contractId.replace("#", "_"))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(Warrants);