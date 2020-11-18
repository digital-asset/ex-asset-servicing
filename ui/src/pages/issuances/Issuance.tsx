import React from "react";
import { useStreamQueries } from "@daml/react";
import { Typography, Table, TableBody, TableCell, TableRow, Paper, Divider } from "@material-ui/core";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import { useParams, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { AdmissionCheckRequest, AdmissionCheckResponse, CodeAllocationRequest, CodeAllocationResponse, DepositInstruction, GlobalNotesRequest, GlobalNotesResponse, WarrantIssuanceRequest } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { Cancel, CheckCircle, Help, RadioButtonUnchecked } from "@material-ui/icons";
import { getName } from "../../config";

const Issuance : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const { contractId } = useParams<any>();
  const cid = contractId.replace("_", "#");
  
  const irs = useStreamQueries(WarrantIssuanceRequest).contracts;
  const acreqs = useStreamQueries(AdmissionCheckRequest).contracts;
  const acress = useStreamQueries(AdmissionCheckResponse).contracts;
  const careqs = useStreamQueries(CodeAllocationRequest).contracts;
  const caress = useStreamQueries(CodeAllocationResponse).contracts;
  const gnreqs = useStreamQueries(GlobalNotesRequest).contracts;
  const gnress = useStreamQueries(GlobalNotesResponse).contracts;
  const dis = useStreamQueries(DepositInstruction).contracts;

  const ir = irs.find(c => c.contractId === cid);
  if (!ir) return (null);
  const acreq = acreqs.find(acreq => acreq.payload.issuanceData.label === ir.payload.issuanceData.label);
  const acres = acress.find(acres => acres.payload.issuanceData.label === ir.payload.issuanceData.label);
  const careq = careqs.find(careq => careq.payload.issuanceData.label === ir.payload.issuanceData.label);
  const cares = caress.find(cares => cares.payload.issuanceData.label === ir.payload.issuanceData.label);
  const gnreq = gnreqs.find(gnreq => gnreq.payload.issuanceData.label === ir.payload.issuanceData.label);
  const gnres = gnress.find(gnres => gnres.payload.issuanceData.label === ir.payload.issuanceData.label);
  const instructed = dis.find(di => di.payload.issuanceData.label === ir.payload.issuanceData.label && !di.payload.settled);
  const settled = dis.find(di => di.payload.issuanceData.label === ir.payload.issuanceData.label && di.payload.settled);

  const acStatus = !acreq && !acres
    ? "Admission check pending"
    : (!!acreq && !acres
      ? "Admission check requested"
      : (!acreq && !!acres && acres.payload.admissionCheck.parties && acres.payload.admissionCheck.product && acres.payload.admissionCheck.legalDocs
        ? "Admission check successful"
        : "Admission check failed"));
  const acColor = !acreq && !acres
    ? "#bbbbbb"
    : (!!acreq && !acres
      ? "#999900"
      : (!acreq && !!acres && acres.payload.admissionCheck.parties && acres.payload.admissionCheck.product && acres.payload.admissionCheck.legalDocs
        ? "#009900"
        : "#990000"));
  const caStatus = !careq && !cares
    ? "Code allocation pending"
    : (!!careq && !cares
      ? "Code allocation requested"
      : "Code allocation successful");
  const caColor = !careq && !cares
    ? "#bbbbbb"
    : (!!careq && !cares
      ? "#999900"
      : "#009900");
  const gnStatus = !gnreq && !gnres
    ? "Global notes setup pending"
    : (!!gnreq && !gnres
      ? "Global notes setup requested"
      : (!gnreq && !!gnres && gnres.payload.success
        ? "Global notes setup successful"
        : "Global notes setup failed"));
  const gnColor = !gnreq && !gnres
    ? "#bbbbbb"
    : (!!gnreq && !gnres
      ? "#999900"
      : (!gnreq && !!gnres && gnres.payload.success
        ? "#009900"
        : "#990000"));
  const diStatus = !instructed && !settled
    ? "Deposit instruction pending"
    : (!!instructed && !settled
      ? "Deposit instruction sent"
      : "Deposit instruction settled");
  const diColor = !instructed && !settled
    ? "#bbbbbb"
    : (!!instructed && !settled
      ? "#999900"
      : "#009900");
  
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>Product configuration completed</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: "#009900" }}>
            <CheckCircle fontSize="large" className={classes.green} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1" style={{ paddingBottom: 10 }}>Product Configuration</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Instrument</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>Warrant</TableCell>
                </TableRow>
                <TableRow key={1} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Underlying</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.terms.underlying.label}</TableCell>
                </TableRow>
                <TableRow key={2} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Option Type</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.terms.optionType}</TableCell>
                </TableRow>
                <TableRow key={3} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Strike</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.terms.strike}</TableCell>
                </TableRow>
                <TableRow key={4} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Expiry</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.terms.expiry}</TableCell>
                </TableRow>
                <TableRow key={5} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Exercise Type</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.terms.exerciseType}</TableCell>
                </TableRow>
                <TableRow key={6} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Contract Size</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.terms.contractSize}</TableCell>
                </TableRow>
                <TableRow key={7} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Issue Size</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.issueSize}</TableCell>
                </TableRow>
                <TableRow key={8} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Min Denom</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.minimumDenomination}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>{acStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: acColor }}>
            {!acreq && !acres && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {!!acreq && !acres && <Help className={classes.yellow} fontSize="large" />}
            {!acreq && !!acres && acres.payload.admissionCheck.parties && acres.payload.admissionCheck.product && acres.payload.admissionCheck.legalDocs && <CheckCircle className={classes.green} fontSize="large" />}
            {!acreq && !!acres && (!acres.payload.admissionCheck.parties || !acres.payload.admissionCheck.product || !acres.payload.admissionCheck.legalDocs) && <Cancel className={classes.red} fontSize="large" />}
            </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {!!acres && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1" style={{ paddingBottom: 10 }}>Securities Admission</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Entity Checks</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{acres.payload.admissionCheck.parties ? "Successful" : "Failed"}</TableCell>
                </TableRow>
                <TableRow key={1} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Product Checks</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{acres.payload.admissionCheck.product ? "Successful" : "Failed"}</TableCell>
                </TableRow>
                <TableRow key={2} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Legal Documentation Checks</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{acres.payload.admissionCheck.legalDocs ? "Successful" : "Failed"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>{caStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: caColor }}>
            {!careq && !cares && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {!!careq && !cares && <Help className={classes.yellow} fontSize="large" />}
            {!careq && !!cares && <CheckCircle className={classes.green} fontSize="large" />}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {!!cares && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1">Code Allocation</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>ISIN</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{cares.payload.allocatedCode}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>{gnStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: gnColor }}>
            {!gnreq && !gnres && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {!!gnreq && !gnres && <Help className={classes.yellow} fontSize="large" />}
            {!gnreq && !!gnres && gnres.payload.success && <CheckCircle className={classes.green} fontSize="large" />}
            {!gnreq && !!gnres && !gnres.payload.success && <Cancel className={classes.red} fontSize="large" />}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {!!gnres && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1">Global Notes Setup</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Status</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{gnres.payload.success ? "Successful" : "Failed"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>{diStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: diColor }}>
            {!instructed && !settled && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {!!instructed && !settled && <Help className={classes.yellow} fontSize="large" />}
            {!instructed && !!settled && <CheckCircle className={classes.green} fontSize="large" />}
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          {(!!instructed || !!settled) && !!cares && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1">Deposit Instruction</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Account</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceAccount.id.label}</TableCell>
                </TableRow>
                <TableRow key={1} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Provider</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{getName(ir.payload.issuanceAccount.provider)}</TableCell>
                </TableRow>
                <TableRow key={2} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Owner</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{getName(ir.payload.issuanceAccount.owner)}</TableCell>
                </TableRow>
                <TableRow key={3} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Asset</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{cares.payload.allocatedCode}</TableCell>
                </TableRow>
                <TableRow key={4} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Quantity</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{ir.payload.issuanceData.issueSize}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default Issuance;