import React from "react";
import { useLedger, useParty, useQuery, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton, Button, Chip } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { CheckCircle, KeyboardArrowRight, RadioButtonUnchecked, TrendingFlat } from "@material-ui/icons";
import { ContractId } from "@daml/types";
import { SubscriptionRequest, SubscriptionResponse, DistributionRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { Agent } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import { getAsset } from "../../scripts/Util";

const Distributions : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const party = useParty();
  const ledger = useLedger();
  const agentRoles = useQuery(Agent).contracts;
  const isAgent = agentRoles.length > 0 && agentRoles[0].payload.agent === party;
  const drs = useStreamQueries(DistributionRequest).contracts;
  const sreqs = useStreamQueries(SubscriptionRequest).contracts;
  const sress = useStreamQueries(SubscriptionResponse).contracts;
  const status = sress.length > 0
    ? "Subscriptions received"
    : (sreqs.length > 0
      ? "Subscription opened"
      : "Distribution requested");

  const entries = drs.map(dr => {
    return {
      contractId: dr.contractId,
      issuer: dr.payload.issuer,
      asset: dr.payload.asset,
      subscribed: sress.map(c => parseInt(c.payload.quantity)).reduce((a, b) => a + b, 0).toFixed(1),
      status,
      requested: sreqs.filter(sr => sr.payload.label === dr.payload.label),
      received: sress.filter(sr => sr.payload.label === dr.payload.label),
    }
  });

  const openSubscription = async (distributionRequestCid : ContractId<DistributionRequest>) => {
    if (!isAgent) return;
    const price = getAsset(agentRoles[0].payload.depository, "EUR", "0.85");
    await ledger.exercise(DistributionRequest.RequestSubscription, distributionRequestCid, { investors: agentRoles[0].payload.investors, price });
  };

  const closeSubscription = async (distributionRequestCid : ContractId<DistributionRequest>, subscriptionResponseCids : ContractId<SubscriptionResponse>[]) => {
    if (!isAgent) return;
    const agentAccountAtAgent = agentRoles[0].payload.ownAccount;
    const agentAccountAtDepository = agentRoles[0].payload.depositoryAccount;
    const args = { subscriptionResponseCids, agentAccountAtAgent, agentAccountAtDepository };
    await ledger.exercise(DistributionRequest.InstructDistribution, distributionRequestCid, args);
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell} align="center"><b>Issuer</b></TableCell>
          <TableCell key={1} className={classes.tableCell} align="center"><b>Asset</b></TableCell>
          <TableCell key={2} className={classes.tableCell} align="right"><b>Total Size</b></TableCell>
          <TableCell key={3} className={classes.tableCell} align="right"><b>Subscribed</b></TableCell>
          <TableCell key={4} className={classes.tableCell} align="center"><b>Status</b></TableCell>
          <TableCell key={5} className={classes.tableCell} align="center"><b>Workflow</b></TableCell>
          <TableCell key={6} className={classes.tableCell} align="center" style={{ width: "100px" }}><b>Action</b></TableCell>
          <TableCell key={7} className={classes.tableCell} align="center"><b>Details</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell} align="center">{e.issuer}</TableCell>
            <TableCell key={1} className={classes.tableCell} align="center">{e.asset.id.label}</TableCell>
            <TableCell key={2} className={classes.tableCell} align="right">{e.asset.quantity}</TableCell>
            <TableCell key={3} className={classes.tableCell} align="right">{e.subscribed}</TableCell>
            <TableCell key={4} className={classes.tableCell} align="center">{e.status}</TableCell>
            <TableCell key={5} className={classes.tableCell} align="center">
              {e.requested.length + e.received.length === 0 && <><RadioButtonUnchecked className={classes.default} /><TrendingFlat /></>}
              {e.requested.length + e.received.length > 0 && <><CheckCircle className={classes.green} /><TrendingFlat /></>}
              {e.requested.length + e.received.length === 0 && <><RadioButtonUnchecked className={classes.default} /><TrendingFlat /></>}
              {e.requested.length + e.received.length > 0 && <><Chip className={classes.chip} size="small" label={e.requested.length}/><TrendingFlat /></>}
              {e.received.length === 0 && <><RadioButtonUnchecked className={classes.default} /></>}
              {e.received.length > 0 && <><Chip className={classes.chip} size="small" label={e.received.length}/></>}
            </TableCell>
            <TableCell key={6} className={classes.tableCell} align="center">
              {isAgent && e.requested.length === 0 && e.received.length === 0 && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => openSubscription(e.contractId)}>Open Subscription</Button>}
              {isAgent && e.requested.length + e.received.length > 0 && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" disabled={e.received.length === 0} onClick={() => closeSubscription(e.contractId, e.received.map(r => r.contractId))}>Close Subscription</Button>}
            </TableCell>
            <TableCell key={7} className={classes.tableCell}>
              <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/distribution/distributions/" + e.contractId.replace("#", "_"))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(Distributions);