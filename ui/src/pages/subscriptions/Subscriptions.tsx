import React, { useState } from "react";
import { useLedger, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, IconButton, Button } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useStyles from "../styles";
import {  KeyboardArrowRight } from "@material-ui/icons";
import { SubscriptionRequest } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Distribution/Distribution";
import { InputDialog, InputDialogProps } from "../../components/InputDialog/InputDialog";
import { AssetDeposit } from "@daml.js/dsp-0.0.1/lib/DA/Finance/Asset";
import { CreateEvent } from "@daml/ledger";
import { getName } from "../../config";

const Subscriptions : React.FC<RouteComponentProps> = ({ history } : RouteComponentProps) => {
  const classes = useStyles();

  const ledger = useLedger();
  const entries = useStreamQueries(SubscriptionRequest).contracts;
  const ads = useStreamQueries(AssetDeposit).contracts;

  const defaultDialogProps : InputDialogProps<any> = {
    open: false,
    title: "Subscription",
    defaultValue: { amount: "0" },
    fields: {
      amount: {
        label: "Amount",
        type: "text"
      }
    },
    onClose: async function() {}
  };
  const [dialogProps, setDialogProps] = useState(defaultDialogProps);
  function showDialog(sr : CreateEvent<SubscriptionRequest>) {
    async function onClose(state : any | null) {
      setDialogProps({ ...defaultDialogProps, open: false});
      const cost = Math.round(parseInt(state.amount) * parseFloat(sr.payload.price.quantity));
      const ad = ads.find(c => c.payload.asset.id.label === sr.payload.price.id.label && parseInt(c.payload.asset.quantity) === cost);
      if (!state || !ad || parseInt(ad.payload.asset.quantity) < cost) return;
      if (parseInt(ad.payload.asset.quantity) > cost) {
        const [ [ depositCid, ], ] = await ledger.exercise(AssetDeposit.AssetDeposit_Split, ad.contractId, { quantities: [ state.amount ] });
        await ledger.exercise(SubscriptionRequest.RespondSubscription, sr.contractId, { quantity: state.amount, depositCid });
      } else {
        await ledger.exercise(SubscriptionRequest.RespondSubscription, sr.contractId, { quantity: state.amount, depositCid: ad.contractId });
      }
    };
    setDialogProps({...defaultDialogProps, open: true, onClose});
  };

  return (
    <>
      <InputDialog { ...dialogProps } />
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell} align="center"><b>Issuer</b></TableCell>
            <TableCell key={1} className={classes.tableCell} align="center"><b>Asset</b></TableCell>
            <TableCell key={2} className={classes.tableCell} align="right"><b>Available Size</b></TableCell>
            <TableCell key={3} className={classes.tableCell} align="right"><b>Price Per Unit</b></TableCell>
            <TableCell key={4} className={classes.tableCell} align="center"><b>Action</b></TableCell>
            <TableCell key={5} className={classes.tableCell} align="center"><b>Details</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((e, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell} align="center">{getName(e.payload.issuer)}</TableCell>
              <TableCell key={1} className={classes.tableCell} align="center">{e.payload.asset.id.label}</TableCell>
              <TableCell key={2} className={classes.tableCell} align="right">{e.payload.asset.quantity}</TableCell>
              <TableCell key={3} className={classes.tableCell} align="right">{e.payload.price.quantity + " " + e.payload.price.id.label}</TableCell>
              <TableCell key={4} className={classes.tableCell} align="center">
                <Button color="secondary" size="small" className={classes.choiceButton} variant="contained" onClick={() => showDialog(e)}>Subscribe</Button>
              </TableCell>
              <TableCell key={5} className={classes.tableCell}>
                <IconButton color="primary" size="small" component="span" onClick={() => history.push("/apps/distribution/subscriptions/" + e.contractId.replace("#", "_"))}>
                  <KeyboardArrowRight fontSize="small"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default withRouter(Subscriptions);