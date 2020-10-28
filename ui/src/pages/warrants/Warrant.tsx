import React, { useState } from "react";
import { useStreamQuery, useLedger } from "@daml/react";
import { Typography, Grid, Table, TableBody, TableCell, TableRow, Button, CircularProgress } from "@material-ui/core";
import { useParams, RouteComponentProps } from "react-router-dom";
import useStyles from "./styles";
import { ContractId } from "@daml/types";
import { KeyboardArrowRight } from "@material-ui/icons";
import { AdmissionCheckRequest, AdmissionCheckResponse, CodeAllocationRequest, CodeAllocationResponse, DepositInstruction, GlobalNotesRequest, GlobalNotesResponse, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";

const Warrant : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const [isLifecyclingAcbrc, setIsLifecyclingAcbrc] = useState(false);

  const { contractId } = useParams<any>();
  const cid = contractId.replace("_", "#");
  
  const ledger = useLedger();
  const ir = useStreamQuery(WarrantIssuanceRequest).contracts.find(c => c.contractId === cid);
  const acreq = useStreamQuery(AdmissionCheckRequest).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const acres = useStreamQuery(AdmissionCheckResponse).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const careq = useStreamQuery(CodeAllocationRequest).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const cares = useStreamQuery(CodeAllocationResponse).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const gnreq = useStreamQuery(GlobalNotesRequest).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const gnres = useStreamQuery(GlobalNotesResponse).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const di = useStreamQuery(DepositInstruction).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  if (!ir) return (null);

  return (
    <>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.heading}>{ir.payload.issuanceData.label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Table size="small">
            <TableBody>
              <TableRow key={0} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Product Configuration</TableCell>
                <TableCell key={1} className={classes.tableCell}>{ir.payload.issuanceData.terms.underlying.label}</TableCell>
              </TableRow>
              <TableRow key={1} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Security Admission</TableCell>
                <TableCell key={1} className={classes.tableCell}>{acres?.payload.admissionCheck.parties.toString()}</TableCell>
              </TableRow>
              <TableRow key={2} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Code Allocation</TableCell>
                <TableCell key={1} className={classes.tableCell}>{cares?.payload.allocatedCode}</TableCell>
              </TableRow>
              <TableRow key={3} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Global Notes</TableCell>
                <TableCell key={1} className={classes.tableCell}>{gnres?.payload.success.toString()}</TableCell>
              </TableRow>
              <TableRow key={4} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>Deposit Instruction</TableCell>
                <TableCell key={1} className={classes.tableCell}>{(!!di).toString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default Warrant;