import React from "react";
import { useStreamQuery } from "@daml/react";
import { AssetDeposit, AssetCategorization } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import { LifecycleEffects } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { CreateEvent } from "@daml/ledger";
import LifecycleDialog, { LifecycleDialogProps } from "./LifecycleDialog";
import useStyles from "./styles";

interface PositionProps {
  assetClass? : string
  assetType? : string
}

const Positions : React.FC<PositionProps> = ({ assetClass, assetType }) => {
  const classes = useStyles();

  const [props, setProps] = React.useState<LifecycleDialogProps>({ open: false, onClose: () => {}, deposit: undefined, effect: undefined });

  const onClose = () => {
    setProps({ open: false, onClose, deposit: undefined, effect: undefined });
  }

  const openDialog = (deposit : CreateEvent<AssetDeposit>, effect: CreateEvent<LifecycleEffects> | undefined) => {
    setProps({ open: true, onClose, deposit, effect });
  }

  const deposits = useStreamQuery(AssetDeposit).contracts;
  const categories = useStreamQuery(AssetCategorization).contracts;
  const effects = useStreamQuery(LifecycleEffects).contracts;
  const entries = deposits.map(deposit => {
    const category = categories.find(c => c.payload.id.label === deposit.payload.asset.id.label);
    const effect = effects.find(e => e.payload.id.label === deposit.payload.asset.id.label && e.payload.id.version === deposit.payload.asset.id.version);
    return { deposit, category, effect }
  });

  const getCid = (cid : string) => {
    return parseFloat(cid.substring(1).replace(":", "."));
  }

  const displayedEntries = entries
    .filter(e => (!assetClass || e.category?.payload.assetClass === assetClass))
    .filter(e => (!assetType || e.category?.payload.assetType === assetType))
    .sort((a, b) => { return getCid(a.deposit.contractId) < getCid(b.deposit.contractId) ? -1 : 1; });

  return (
    <>
      <LifecycleDialog {...props} />
      <Table>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>Contract</TableCell>
            <TableCell key={1} className={classes.tableCell}>Account</TableCell>
            <TableCell key={2} className={classes.tableCell}>Asset Class</TableCell>
            <TableCell key={3} className={classes.tableCell}>Instrument</TableCell>
            <TableCell key={4} className={classes.tableCell}>Name</TableCell>
            <TableCell key={5} className={classes.tableCell}>Quantity</TableCell>
            <TableCell key={6} className={classes.tableCell}>Version</TableCell>
            <TableCell key={7} className={classes.tableCell} style={{ width: "120px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedEntries.map((e, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{e.deposit.contractId.slice(-8)}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{e.deposit.payload.account.id.label}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{e.category?.payload.assetClass}</TableCell>
              <TableCell key={3} className={classes.tableCell}>{e.category?.payload.assetType}</TableCell>
              <TableCell key={4} className={classes.tableCell}>{e.deposit.payload.asset.id.label}</TableCell>
              <TableCell key={5} className={classes.tableCell} align={"right"}>{e.deposit.payload.asset.quantity}</TableCell>
              <TableCell key={6} className={classes.tableCell}>{e.deposit.payload.asset.id.version}</TableCell>
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

export default Positions;
