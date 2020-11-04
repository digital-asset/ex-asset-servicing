import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import Forward from "@material-ui/icons/Forward";
import { CreateEvent } from "@daml/ledger";
import { useLedger } from "@daml/react";
import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { LifecycleEffects, AssetLifecycleRule } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { useUserState } from "../../context/UserContext";

export type LifecycleDialogProps = {
  open: boolean
  onClose: () => void
  deposit : CreateEvent<AssetDeposit> | undefined
  effect : CreateEvent<LifecycleEffects> | undefined
}

const LifecycleDialog : React.FC<LifecycleDialogProps> = ({ open, onClose, deposit, effect }) => {

  const user = useUserState();
  const [isApplyingEffect, setIsApplyingEffect] = React.useState(false);

  const ledger = useLedger();

  if (!deposit || !effect) return (null);

  const applyEffect = async () => {
    setIsApplyingEffect(true);
    const args = {
      lifecycleEffectsCid: effect.contractId,
      depositCid: deposit.contractId,
      consumingDepositCids: [],
      accountIds: null,
      ctrl: user.party
    };
    await ledger.exerciseByKey(AssetLifecycleRule.AssetLifecycle_Process, deposit.payload.account.id, args);
    setIsApplyingEffect(false);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
      <DialogTitle>Lifecycle Effects: {effect.payload.label}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <Typography gutterBottom variant="body2">1.0 * <Chip label={deposit.payload.asset.id.label} size="small" color="secondary"/> <Chip label={"v" + deposit.payload.asset.id.version} size="small" color="secondary"/></Typography>
          </Grid>
          <Grid item xs={2}>
            <Forward />
          </Grid>
          <Grid item xs={5}>
            {effect.payload.effects.map((e, i) => (
              <Typography gutterBottom variant="body2" key={i}>{e.quantity} * <Chip label={e.id.label} size="small" color="secondary"/> <Chip label={"v" + e.id.version} size="small" color="secondary"/></Typography>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {!isApplyingEffect && <Button onClick={onClose} color="primary" variant="contained">Cancel</Button>}
        {isApplyingEffect ? (<CircularProgress size="32px" />) : (<Button onClick={applyEffect} color="primary" variant="contained" autoFocus>Apply</Button>) }
      </DialogActions>
    </Dialog>
  );
}

export default LifecycleDialog;
