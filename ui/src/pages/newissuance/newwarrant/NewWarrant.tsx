import React, { useState } from "react";
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { RouteComponentProps } from "react-router-dom";
import useStyles from "../../styles";
import { useLedger, useParty, useQuery } from "@daml/react";
import { Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";

const NewWarrant : React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  const issuers = useQuery(Issuer).contracts;
  const isIssuer = issuers.length > 0 && issuers[0].payload.issuer === party;

  const [ optionType, setOptionType ] = useState<string>("");
  const [ strike, setStrike ] = useState<string>("");
  const [ exerciseType, setExerciseType ] = useState<string>("");
  const [ expiry, setExpiry ] = useState<Date | null>(null);
  const [ contractSize, setContractSize ] = useState<string>("");
  const [ issueSize, setIssueSize ] = useState<string>("");
  const [ minimumDenomination, setMinimumDenomination ] = useState<string>("");
  const [ agent, setAgent ] = useState<string>("");

  const getLabel = () => {
    const part1 = !!optionType ? "-" + optionType : "";
    const part2 = !!strike ? "-" + strike : "";
    const part3 = !!expiry && expiry.toString() !== "Invalid Date" ? "-" + expiry.getFullYear() + (expiry.getMonth() < 9 ? "0" + (expiry.getMonth() + 1) : expiry.getMonth() + 1) + (expiry.getDate() < 9 ? "0" + expiry.getDate() : expiry.getDate()) : "";
    const part4 = !!exerciseType ? "-" + exerciseType[0] : ""
    return issuers[0]?.payload.assetId.label + part1 + part2 + part3 + part4;
  }

  const requestWarrantIssuance = async () => {
    if (!isIssuer) return;
    const terms = { underlying: issuers[0].payload.assetId, optionType, strike, expiry: expiry!.toISOString().slice(0, 10), exerciseType, contractSize };
    const issuanceData = { label: getLabel(), terms, issueSize, minimumDenomination };
    await ledger.exercise(Issuer.RequestWarrantIssuance, issuers[0].contractId, { agent, issuanceData });
    history.push("/apps/assetissuance/issuances");
  }

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.heading}>New Warrant Issuance</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField key={0} className={classes.inputField} autoFocus fullWidth label="Id" type="text" disabled value={getLabel()} />
            <TextField key={1} className={classes.inputField} autoFocus fullWidth label="Underlying" type="text" disabled value={issuers[0]?.payload.assetId.label} InputLabelProps={{ shrink: true }} />
            <FormControl key={2} className={classes.inputField} fullWidth>
              <InputLabel>Option Type</InputLabel>
              <Select
                  value={optionType}
                  onChange={e => setOptionType(e.target.value as string)}
                  MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}>
                <MenuItem key={0} value="CALL">CALL</MenuItem>
                <MenuItem key={1} value="PUT">PUT</MenuItem>
              </Select>
            </FormControl>
            <TextField key={3} className={classes.inputField} fullWidth label="Strike" type="text" onChange={e => setStrike(e.target.value as string)} />
            <KeyboardDatePicker key={4} className={classes.inputField} fullWidth disableToolbar variant="inline" format="yyyy-MM-dd" margin="normal" label="Expiry Date" value={expiry} defaultValue="" onChange={setExpiry} />
            <FormControl key={5} className={classes.inputField} fullWidth>
              <InputLabel>Exercise Type</InputLabel>
              <Select
                  value={exerciseType}
                  onChange={e => setExerciseType(e.target.value as string)}
                  MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}>
                <MenuItem key={0} value="EUROPEAN">EUROPEAN</MenuItem>
                <MenuItem key={1} value="AMERICAN">AMERICAN</MenuItem>
              </Select>
            </FormControl>
            <TextField key={6} className={classes.inputField} fullWidth label="Contract Size" type="text" onChange={e => setContractSize(e.target.value as string)}/>
            <TextField key={7} className={classes.inputField} fullWidth label="Issue Size" type="text" onChange={e => setIssueSize(e.target.value as string)}/>
            <TextField key={8} className={classes.inputField} fullWidth label="Minimum Denomination" type="text" onChange={e => setMinimumDenomination(e.target.value as string)}/>
            <FormControl key={9} className={classes.inputField} fullWidth>
              <InputLabel>Lead Manager</InputLabel>
              <Select
                  value={agent}
                  onChange={e => setAgent(e.target.value as string)}
                  MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}>
                <MenuItem key={0} value="DB">DB</MenuItem>
                <MenuItem key={1} value="UBS">UBS</MenuItem>
                <MenuItem key={2} value="COMMERZBANK">COMMERZBANK</MenuItem>
              </Select>
            </FormControl>
            <Button key={10} className={classes.newButton} fullWidth color="secondary" size="large" variant="contained" onClick={() => requestWarrantIssuance()}>Request Issuance</Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default NewWarrant;