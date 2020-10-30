import React from "react";
import { useLedger, useParty, useQuery, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton, Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import { KeyboardArrowRight } from "@material-ui/icons";
import { ContractId } from "@daml/types";
import { SubscriptionRequest, SubscriptionResponse, DistributionRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { Agent } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import { Asset } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Types";
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
  const entries = drs.map(dr => {
    return {
      contractId: dr.contractId,
      issuer: dr.payload.issuer,
      asset: dr.payload.asset,
      requested: sreqs.filter(sr => sr.payload.label === dr.payload.label),
      received: sress.filter(sr => sr.payload.label === dr.payload.label),
    }
  });

  const requestSubscription = async (distributionRequestCid : ContractId<DistributionRequest>) => {
    if (!isAgent) return;
    const [ , price ] = getAsset(agentRoles[0].payload.depository, "EUR", "0.85");
    await ledger.exercise(DistributionRequest.RequestSubscription, distributionRequestCid, { investors: agentRoles[0].payload.investors, price });
  };

  const instructDistribution = async (distributionRequestCid : ContractId<DistributionRequest>, subscriptionResponseCids : ContractId<SubscriptionResponse>[], asset : Asset) => {
    if (!isAgent) return;
    const distributionAccount = agentRoles[0].payload.distributionAccount;
    const cashAccount = distributionAccount;
    await ledger.exercise(DistributionRequest.InstructDistribution, distributionRequestCid, { subscriptionResponseCids, distributionAccount, cashAccount });
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}>Issuer</TableCell>
          <TableCell key={1} className={classes.tableCell}>Asset</TableCell>
          <TableCell key={2} className={classes.tableCell}>Quantity</TableCell>
          <TableCell key={3} className={classes.tableCell}>Requested</TableCell>
          <TableCell key={4} className={classes.tableCell}>Received</TableCell>
          <TableCell key={5} className={classes.tableCell}></TableCell>
          <TableCell key={6} className={classes.tableCell}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((e, i) => (
          <TableRow key={i} className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>{e.issuer}</TableCell>
            <TableCell key={1} className={classes.tableCell}>{e.asset.id.label}</TableCell>
            <TableCell key={2} className={classes.tableCell}>{e.asset.quantity}</TableCell>
            <TableCell key={3} className={classes.tableCell}>{e.requested.length}</TableCell>
            <TableCell key={4} className={classes.tableCell}>{e.received.length}</TableCell>
            <TableCell key={5} className={classes.tableCell}>
              {isAgent && e.requested.length === 0 && e.received.length === 0 && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => requestSubscription(e.contractId)}>Request Subscription</Button>}
              {isAgent && e.requested.length + e.received.length > 0 && <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" disabled={e.received.length === 0} onClick={() => instructDistribution(e.contractId, e.received.map(r => r.contractId), e.asset)}>Instruct Distribution</Button>}
            </TableCell>
            <TableCell key={6} className={classes.tableCell}>
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