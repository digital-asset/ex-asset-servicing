import React, { useState } from "react";
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import useStyles from "../styles";
import { useLedger, useParty, useQuery } from "@daml/react";
import { Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";
import { CodeAllocationResponse, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { getAccount } from "../../scripts/Util";

const NewDistribution : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  const issuers = useQuery(Issuer).contracts;
  const isIssuer = issuers.length > 0 && issuers[0].payload.issuer === party;
  const irs = useQuery(WarrantIssuanceRequest).contracts.filter(ir => ir.payload.settled);
  const cas = useQuery(CodeAllocationResponse).contracts;
  const ads = useQuery(AssetDeposit).contracts;
  const [ issuance, setIssuance ] = useState<string>("");
  const [ distributionSize, setDistributionSize ] = useState<string>("");
  const [ distributionType, setDistributionType ] = useState<string>("");
  const [ agent, setAgent ] = useState<string>("");

  const getLabel = () => {
    const ca = cas.find(c => c.payload.issuanceData.label === issuance);
    const part1 = !!ca ? "-" + ca.payload.allocatedCode : "";
    // const part2 = !!distributionSize ? "-" + distributionSize : "";
    return "DIST-" + issuers[0]?.payload.issuer + part1;
  }

  const requestDistribution = async () => {
    if (!isIssuer) return;
    const code = cas.find(c => c.payload.issuanceData.label === issuance)?.payload.allocatedCode || "";
    const ad = ads.find(c => c.payload.asset.id.label === code);
    if (!ad) return
    const agentAccount = getAccount(agent, party, party + "@" + agent);
    const asset = { ...ad.payload.asset, quantity: distributionSize };
    await ledger.exercise(Issuer.RequestDistribution, issuers[0].contractId, { label: getLabel(), agent, agentAccount, asset });
    history.push("/apps/assetdistribution/distributions");
  }

  return (
    <Grid container direction="column" spacing={4} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.heading}>New Warrant Issuance</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField key={0} className={classes.inputField} autoFocus fullWidth label="Id" type="text" disabled value={getLabel()} />
        <FormControl key={1} className={classes.inputField} fullWidth>
          <InputLabel>Issuance</InputLabel>
          <Select
              value={issuance}
              onChange={e => setIssuance(e.target.value as string)}
              MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}>
            {irs.map(ir => <MenuItem key={0} value={ir.payload.issuanceData.label}>{ir.payload.issuanceData.label}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField key={2} className={classes.inputField} fullWidth label="Asset" type="text" disabled value={cas.find(r => r.payload.issuanceData.label === issuance)?.payload.allocatedCode || ""} InputLabelProps={{ shrink: true }} />
        <TextField key={3} className={classes.inputField} fullWidth label="Issue Size" type="text" disabled value={irs.find(ir => ir.payload.issuanceData.label === issuance)?.payload.issuanceData.issueSize || ""} />
        <TextField key={4} className={classes.inputField} fullWidth label="Distribution Size" type="text" onChange={e => setDistributionSize(e.target.value as string)}/>
        <FormControl key={5} className={classes.inputField} fullWidth>
          <InputLabel>Distribution Type</InputLabel>
          <Select
              value={distributionType}
              onChange={e => setDistributionType(e.target.value as string)}
              MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}>
            <MenuItem key={0} value="Direct">Direct</MenuItem>
            <MenuItem key={1} value="Subscription">Subscription</MenuItem>
            <MenuItem key={2} value="Auction">Auction</MenuItem>
          </Select>
        </FormControl>
        <FormControl key={6} className={classes.inputField} fullWidth>
          <InputLabel>Distribution Agent</InputLabel>
          <Select
              value={agent}
              onChange={e => setAgent(e.target.value as string)}
              MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}>
            <MenuItem key={0} value="DB">DB</MenuItem>
            <MenuItem key={1} value="UBS">UBS</MenuItem>
            <MenuItem key={2} value="COMMERZBANK">COMMERZBANK</MenuItem>
          </Select>
        </FormControl>
        <Button key={10} className={classes.newButton} fullWidth color="secondary" size="large" variant="contained" onClick={() => requestDistribution()}>Request Distribution</Button>
      </Grid>
    </Grid>
  );
}

export default withRouter(NewDistribution);