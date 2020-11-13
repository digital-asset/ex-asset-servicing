import React from "react";
import { useLedger, useParty, useQuery, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton, Button, Chip } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { CheckCircle, Help, KeyboardArrowRight, RadioButtonUnchecked, TrendingFlat } from "@material-ui/icons";
import { ContractId } from "@daml/types";
import { SubscriptionRequest, SubscriptionResponse, DistributionRequest, SettlementInstruction } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { Agent } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import { getAsset } from "../../scripts/Util";
import { Warrant } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";

const Distributions : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const party = useParty();
  const ledger = useLedger();
  const agentRoles = useQuery(Agent).contracts;
  const isAgent = agentRoles.length > 0 && agentRoles[0].payload.agent === party;
  const drs = useStreamQueries(DistributionRequest).contracts;
  const sis = useStreamQueries(SettlementInstruction).contracts;
  const warrants = useStreamQueries(Warrant).contracts;
  const sreqs = useStreamQueries(SubscriptionRequest).contracts;
  const sress = useStreamQueries(SubscriptionResponse).contracts;

  const entries = drs.map(dr => {
    const requested = sreqs.filter(sr => sr.payload.label === dr.payload.label);
    const received = sress.filter(sr => sr.payload.label === dr.payload.label);
    const instructed = sis.filter(r => r.payload.label === dr.payload.label && !r.payload.settled);
    const settled = sis.filter(r => r.payload.label === dr.payload.label && r.payload.settled);

    const status = instructed.length === 0 && settled.length > 0
      ? "Distribution settled"
      : (instructed.length > 0
        ? "Distribution instructed"
        : (received.length > 0
          ? "Subscriptions received"
          : (requested.length > 0
            ? "Subscription opened"
            : "Distribution requested")));
  
    return {
      contractId: dr.contractId,
      issuer: dr.payload.issuer,
      asset: dr.payload.asset,
      subscribed: sress.map(c => parseInt(c.payload.quantity)).reduce((a, b) => a + b, 0).toFixed(1),
      status,
      instructed,
      settled,
      requested,
      received,
    }
  });

  const openSubscription = async (distributionRequestCid : ContractId<DistributionRequest>) => {
    if (!isAgent) return;
    const price = getAsset(agentRoles[0].payload.agent, "EUR", "0.085");
    await ledger.exercise(DistributionRequest.RequestSubscription, distributionRequestCid, { investors: agentRoles[0].payload.investors, price });
  };

  const instructDistribution = async (distributionRequestCid : ContractId<DistributionRequest>, subscriptionResponseCids : ContractId<SubscriptionResponse>[], warrantLabel: string, issuer: string) => {
    const warrant = warrants.find(w => w.payload.id.label === warrantLabel);
    if (!isAgent || !warrant) return;
    const agentAccountAtAgent = agentRoles[0].payload.ownAccount;
    const agentAccountAtDepository = agentRoles[0].payload.depositoryAccount;
    const warrantCid = warrant.contractId;
    await ledger.exercise(DistributionRequest.InstructDistribution, distributionRequestCid, { subscriptionResponseCids, warrantCid, agentAccountAtAgent, agentAccountAtDepository });
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
          <TableCell key={5} className={classes.tableCell} align="center" style={{ width: "220px" }}><b>Workflow</b></TableCell>
          <TableCell key={6} className={classes.tableCell} align="center" style={{ width: "170px" }}><b>Action</b></TableCell>
          <TableCell key={7} className={classes.tableCell} align="center" style={{ width: "20px" }}><b>Details</b></TableCell>
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
              {e.requested.length + e.received.length === 0 && <><RadioButtonUnchecked /><TrendingFlat /></>}
              {e.requested.length + e.received.length > 0 && <><CheckCircle className={classes.green} /><TrendingFlat /></>}
              {e.requested.length + e.received.length === 0 && <><RadioButtonUnchecked /><TrendingFlat /></>}
              {e.requested.length + e.received.length > 0 && e.requested.length > 0 && <><Chip className={classes.chipYellow} size="small" label={e.requested.length}/><TrendingFlat /></>}
              {e.requested.length + e.received.length > 0 && e.requested.length === 0 && <><Chip className={classes.chipGreen} size="small" label={e.requested.length}/><TrendingFlat /></>}
              {e.requested.length + e.received.length === 0 && <><RadioButtonUnchecked /><TrendingFlat /></>}
              {e.requested.length > 0 && <><Chip className={classes.chipYellow} size="small" label={e.received.length}/><TrendingFlat /></>}
              {e.requested.length === 0 && e.received.length > 0 && <><Chip className={classes.chipGreen} size="small" label={e.received.length}/><TrendingFlat /></>}
              {e.instructed.length === 0 && e.settled.length === 0 && <RadioButtonUnchecked />}
              {e.instructed.length > 0 && <Help className={classes.yellow} />}
              {e.instructed.length === 0 && e.settled.length > 0 && <CheckCircle className={classes.green} />}
            </TableCell>
            <TableCell key={6} className={classes.tableCell} align="center">
              {isAgent && e.requested.length === 0 && e.received.length === 0 && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => openSubscription(e.contractId)}>Open Subscription</Button>}
              {isAgent && e.instructed.length === 0 && e.settled.length === 0 && e.requested.length + e.received.length > 0 && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" disabled={e.received.length === 0} onClick={() => instructDistribution(e.contractId, e.received.map(r => r.contractId), e.asset.id.label, e.issuer)}>Instruct Distribution</Button>}
            </TableCell>
            <TableCell key={7} className={classes.tableCell}>
              <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/assetdistribution/distributions/" + e.contractId.replace("#", "_"))}>
                <KeyboardArrowRight fontSize="small"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  );
}

export default withRouter(Distributions);