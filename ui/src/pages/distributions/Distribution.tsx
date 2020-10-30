import React from "react";
import { useStreamQueries } from "@daml/react";
import { Typography, Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { RouteComponentProps, useParams } from "react-router-dom";
import useStyles from "../styles";
import { AdmissionCheckResponse, CodeAllocationResponse, DepositInstruction, GlobalNotesResponse, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";

const Distribution : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const { contractId } = useParams<any>();
  const cid = contractId.replace("_", "#");

  const ir = useStreamQueries(WarrantIssuanceRequest).contracts.find(c => c.contractId === cid);
  const acres = useStreamQueries(AdmissionCheckResponse).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const cares = useStreamQueries(CodeAllocationResponse).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const gnres = useStreamQueries(GlobalNotesResponse).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
  const di = useStreamQueries(DepositInstruction).contracts.find(c => c.payload.issuanceData.label === ir?.payload.issuanceData.label);
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

export default Distribution;