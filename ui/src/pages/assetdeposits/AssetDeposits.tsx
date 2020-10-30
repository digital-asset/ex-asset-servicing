import React from "react";
import { useStreamQueries, useParty } from "@daml/react";
import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import { LifecycleEffects } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { CreateEvent } from "@daml/ledger";
import LifecycleDialog, { LifecycleDialogProps } from "../../components/LifecycleDialog/LifecycleDialog";
import useStyles from "./styles";

interface AssetDepositsProps {
  role?: string
  account? : string
}

const AssetDeposits : React.FC<AssetDepositsProps> = ({ role, account }) => {
  const classes = useStyles();

  const [props, setProps] = React.useState<LifecycleDialogProps>({ open: false, onClose: () => {}, deposit: undefined, effect: undefined });

  const onClose = () => {
    setProps({ open: false, onClose, deposit: undefined, effect: undefined });
  }

  const openDialog = (deposit : CreateEvent<AssetDeposit>, effect: CreateEvent<LifecycleEffects> | undefined) => {
    setProps({ open: true, onClose, deposit, effect });
  }

  const party = useParty();
  const deposits = useStreamQueries(AssetDeposit).contracts;//.filter(ad => ad.payload.account.provider === party || ad.payload.account.owner === party);
  const effects = useStreamQueries(LifecycleEffects).contracts;
  const entries = deposits.map(deposit => {
    const effect = effects.find(e => e.payload.id.label === deposit.payload.asset.id.label && e.payload.id.version === deposit.payload.asset.id.version);
    return { deposit, effect }
  });

  const getCid = (cid : string) => {
    return parseFloat(cid.substring(1).replace(":", "."));
  }

  const displayedEntries = entries
    .filter(e => (!role || (role === "provider" && e.deposit.payload.account.provider === party) || (role === "owner" && e.deposit.payload.account.owner === party)))
    .filter(e => (!account || (e.deposit.payload.account.id.label === account)))
    .sort((a, b) => { return getCid(a.deposit.contractId) < getCid(b.deposit.contractId) ? -1 : 1; });

  return (
    <>
      <LifecycleDialog {...props} />
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell} align="center"><b>Contract</b></TableCell>
            <TableCell key={1} className={classes.tableCell} align="center"><b>Account</b></TableCell>
            <TableCell key={2} className={classes.tableCell} align="center"><b>Provider</b></TableCell>
            <TableCell key={3} className={classes.tableCell} align="center"><b>Owner</b></TableCell>
            <TableCell key={4} className={classes.tableCell} align="center"><b>Asset</b></TableCell>
            <TableCell key={5} className={classes.tableCell} align="right"><b>Quantity</b></TableCell>
            <TableCell key={6} className={classes.tableCell} align="center"><b>Version</b></TableCell>
            <TableCell key={7} className={classes.tableCell} style={{ width: "120px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedEntries.map((e, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell} align="center">{e.deposit.contractId.slice(-8)}</TableCell>
              <TableCell key={1} className={classes.tableCell} align="center">{e.deposit.payload.account.id.label}</TableCell>
              <TableCell key={2} className={classes.tableCell} align="center">{e.deposit.payload.account.provider}</TableCell>
              <TableCell key={3} className={classes.tableCell} align="center">{e.deposit.payload.account.owner}</TableCell>
              <TableCell key={4} className={classes.tableCell} align="center">{e.deposit.payload.asset.id.label}</TableCell>
              <TableCell key={5} className={classes.tableCell} align={"right"}>{e.deposit.payload.asset.quantity}</TableCell>
              <TableCell key={6} className={classes.tableCell} align="center">{e.deposit.payload.asset.id.version}</TableCell>
              <TableCell key={7} className={classes.tableCellButton}>
              {e.effect && (
                <Button className={classes.lcButton} color="primary" variant="contained" size="small" component="span" onClick={() => openDialog(e.deposit, e.effect)}>Lifecycle</Button>
              )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default AssetDeposits;
