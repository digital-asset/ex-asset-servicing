import React from "react";
import { useStreamQueries } from "@daml/react";
import { Typography, Table, TableBody, TableCell, TableRow, Paper, Divider, Chip, TableHead } from "@material-ui/core";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import { useParams, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { CheckCircle, Help, RadioButtonUnchecked } from "@material-ui/icons";
import { SettlementInstruction } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { Warrant } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { WarrantExerciseRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Custody/Custody/module";

const Exercise : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const { contractId } = useParams<any>();
  const cid = contractId.replace("_", "#");
  
  const warrants = useStreamQueries(Warrant).contracts;
  const ers = useStreamQueries(WarrantExerciseRequest).contracts;
  const sis = useStreamQueries(SettlementInstruction).contracts;

  const warrant = warrants.find(w => w.contractId === cid);
  if (!warrant) return (null);

  const requests = ers.filter(er => er.payload.warrant.id.label === warrant.payload.id.label);
  const totalQuantity = requests.map(r => parseInt(r.payload.quantity)).reduce((a, b) => a + b, 0);
  const instructed = requests.length === 0 ? [] : sis.filter(si => si.payload.label === requests[0].payload.label && !si.payload.settled);
  const settled = requests.length === 0 ? [] : sis.filter(si => si.payload.label === requests[0].payload.label && si.payload.settled);

  const reqStatus = requests.length === 0
    ? "No exercise notices received"
    : (requests.length > 0 && instructed.length === 0 && settled.length === 0
      ? "Exercise notices received. Volume: " + totalQuantity.toFixed(0)
      : "Exercise closed");
  const reqColor = requests.length === 0
    ? "#bbbbbb"
    : (requests.length > 0 && instructed.length === 0 && settled.length === 0
      ? "#999900"
      : "#009900");
  const siStatus = instructed.length === 0 && settled.length === 0
  ? "Settlement pending"
  : (instructed.length > 0
      ? "Settlement instructed"
      : "Exercise settled");
  const siColor = instructed.length === 0 && settled.length === 0
    ? "#bbbbbb"
    : (instructed.length > 0
      ? "#999900"
      : "#009900");
  
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>Exercise open</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: "#009900" }}>
            <CheckCircle fontSize="large" className={classes.green} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1" style={{ paddingBottom: 10 }}>Warrant</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Instrument</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>Warrant</TableCell>
                </TableRow>
                <TableRow key={1} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Underlying</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{warrant.payload.terms.underlying.label}</TableCell>
                </TableRow>
                <TableRow key={2} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Option Type</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{warrant.payload.terms.optionType}</TableCell>
                </TableRow>
                <TableRow key={3} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Strike</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{warrant.payload.terms.strike}</TableCell>
                </TableRow>
                <TableRow key={4} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Expiry</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{warrant.payload.terms.expiry}</TableCell>
                </TableRow>
                <TableRow key={5} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Exercise Type</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{warrant.payload.terms.exerciseType}</TableCell>
                </TableRow>
                <TableRow key={6} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Contract Size</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{warrant.payload.terms.contractSize}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 9 }}>{reqStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: reqColor }}>
            {requests.length === 0 && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {requests.length > 0 && instructed.length === 0 && settled.length === 0 && <Chip className={classes.chipYellow} label={requests.length}/>}
            {requests.length > 0 && instructed.length === 0 && settled.length > 0 && <Chip className={classes.chipGreen} label={requests.length}/>}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {requests.length > 0 && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1" style={{ paddingBottom: 10 }}>Exercise Notices</Typography>
            <Divider />
            <Table size="small">
              <TableHead>
                <TableRow className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall} align="center"><b>Investor</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall} align="center"><b>Quantity</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map(e => <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall} align="center">{e.payload.investor}</TableCell>
                  <TableCell key={1} className={classes.tableCellSmall} align="center">{e.payload.quantity}</TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>{siStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: siColor }}>
            {instructed.length + settled.length === 0 && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {instructed.length > 0 && <Help className={classes.yellow} fontSize="large" />}
            {instructed.length === 0 && settled.length > 0 && <CheckCircle className={classes.green} fontSize="large" />}
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          {instructed.length + settled.length > 0 && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1">Settlement Instructions</Typography>
            <Divider />
            <Table size="small">
              <TableHead>
                <TableRow className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellMini} align="center"><b>From</b></TableCell>
                  <TableCell key={1} className={classes.tableCellMini} align="center"><b>To</b></TableCell>
                  <TableCell key={2} className={classes.tableCellMini} align="right"><b>Quantity</b></TableCell>
                  <TableCell key={3} className={classes.tableCellMini} align="center"><b>Asset</b></TableCell>
                  <TableCell key={4} className={classes.tableCellMini} align="center"><b>Settled</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instructed.concat(settled).map(e => <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellMini} align="center">{e.payload.fromDeposit.account.owner}</TableCell>
                  <TableCell key={1} className={classes.tableCellMini} align="center">{e.payload.toAccount.owner}</TableCell>
                  <TableCell key={2} className={classes.tableCellMini} align="right">{e.payload.fromDeposit.asset.quantity}</TableCell>
                  <TableCell key={3} className={classes.tableCellMini} align="center">{e.payload.fromDeposit.asset.id.label}</TableCell>
                  <TableCell key={4} className={classes.tableCellMini} align="center">{e.payload.settled.toString()}</TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default Exercise;