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
import { DistributionRequest, SettlementInstruction, SubscriptionRequest, SubscriptionResponse } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Distribution/Distribution";

const Distribution : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  const { contractId } = useParams<any>();
  const cid = contractId.replace("_", "#");
  
  const drs = useStreamQueries(DistributionRequest).contracts;
  const allSis = useStreamQueries(SettlementInstruction).contracts;
  const sreqs = useStreamQueries(SubscriptionRequest).contracts;
  const sress = useStreamQueries(SubscriptionResponse).contracts;

  const dr = drs.find(c => c.contractId === cid);
  if (!dr) return (null);

  const requested = sreqs.filter(r => r.payload.label === dr.payload.label);
  const received = sress.filter(r => r.payload.label === dr.payload.label);
  const sis = allSis.filter(r => r.payload.label === dr.payload.label);
  const instructed = sis.filter(r => !r.payload.settled);
  const settled = sis.filter(r => r.payload.settled);

  const reqStatus = requested.length === 0 && received.length === 0
    ? "Subscription requests pending"
    : (requested.length > 0
      ? "Subscription requests sent"
      : "Subscription closed");
  const reqColor = requested.length === 0 && received.length === 0
    ? "#bbbbbb"
    : (requested.length > 0
      ? "#999900"
      : "#009900");
  const recStatus = received.length === 0
    ? "Subscription responses pending"
    : (requested.length > 0
      ? "Subscription responses received"
      : "Subscription closed");
  const recColor = received.length === 0
    ? "#bbbbbb"
    : (requested.length > 0
      ? "#999900"
      : "#009900");
  const siStatus = instructed.length === 0 && settled.length === 0
    ? "Distribution pending"
    : (instructed.length > 0
      ? "Distribution instructed"
      : "Distribution settled");
  const siColor = instructed.length === 0 && settled.length === 0
    ? "#bbbbbb"
    : (instructed.length > 0
      ? "#999900"
      : "#009900");
  
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 11 }}>Distribution request completed</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: "#009900" }}>
            <CheckCircle fontSize="large" className={classes.green} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1" style={{ paddingBottom: 10 }}>Distribution Request</Typography>
            <Divider />
            <Table size="small">
              <TableBody>
                <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Id</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{dr.payload.label}</TableCell>
                </TableRow>
                <TableRow key={1} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Issuer</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{dr.payload.issuer}</TableCell>
                </TableRow>
                <TableRow key={2} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Distribution Agent</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{dr.payload.agent}</TableCell>
                </TableRow>
                <TableRow key={3} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Instrument</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>Warrant</TableCell>
                </TableRow>
                <TableRow key={4} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Asset</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{dr.payload.asset.id.label}</TableCell>
                </TableRow>
                <TableRow key={5} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}><b>Quantity</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{dr.payload.asset.quantity}</TableCell>
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
            {requested.length + received.length === 0 && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {requested.length + received.length > 0 && requested.length > 0 && <Chip className={classes.chipYellow} label={requested.length}/>}
            {requested.length + received.length > 0 && requested.length === 0 && <Chip className={classes.chipGreen} label={requested.length}/>}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {requested.length > 0 && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1" style={{ paddingBottom: 10 }}>Subscription Requests</Typography>
            <Divider />
            <Table size="small">
              <TableHead>
                <TableRow className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall} align="center"><b>Recipient</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall} align="center"><b>Price</b></TableCell>
                  <TableCell key={2} className={classes.tableCellSmall} align="center"><b>Currency</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requested.map(e => <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}>{e.payload.investor}</TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{e.payload.price.quantity}</TableCell>
                  <TableCell key={2} className={classes.tableCellSmall}>{e.payload.price.id.label}</TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary" style={{ paddingTop: 9 }}>{recStatus}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" style={{ padding: 0, borderColor: recColor }}>
            {requested.length + received.length === 0 && <RadioButtonUnchecked className={classes.default} fontSize="large" />}
            {requested.length > 0 && <><Chip className={classes.chipYellow} label={received.length}/></>}
            {requested.length === 0 && received.length > 0 && <><Chip className={classes.chipGreen} label={received.length}/></>}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          {received.length > 0 && <Paper elevation={3} className={classes.paper} style={{ textAlign: "center" }}>
            <Typography variant="h6" component="h1">Subscription Responses</Typography>
            <Divider />
            <Table size="small">
              <TableHead>
                <TableRow className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall} align="center"><b>Respondent</b></TableCell>
                  <TableCell key={1} className={classes.tableCellSmall} align="center"><b>Quantity</b></TableCell>
                  <TableCell key={2} className={classes.tableCellSmall} align="center"><b>Price</b></TableCell>
                  <TableCell key={3} className={classes.tableCellSmall} align="center"><b>Currency</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {received.map(e => <TableRow key={0} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCellSmall}>{e.payload.investor}</TableCell>
                  <TableCell key={1} className={classes.tableCellSmall}>{e.payload.quantity}</TableCell>
                  <TableCell key={2} className={classes.tableCellSmall}>{e.payload.price.quantity}</TableCell>
                  <TableCell key={3} className={classes.tableCellSmall}>{e.payload.price.id.label}</TableCell>
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
                  <TableCell key={0} className={classes.tableCellMini}>{e.payload.fromDeposit.account.owner}</TableCell>
                  <TableCell key={1} className={classes.tableCellMini}>{e.payload.toAccount.owner}</TableCell>
                  <TableCell key={2} className={classes.tableCellMini} align="right">{e.payload.fromDeposit.asset.quantity}</TableCell>
                  <TableCell key={3} className={classes.tableCellMini}>{e.payload.fromDeposit.asset.id.label}</TableCell>
                  <TableCell key={4} className={classes.tableCellMini}>{e.payload.settled.toString()}</TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </Paper>}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default Distribution;