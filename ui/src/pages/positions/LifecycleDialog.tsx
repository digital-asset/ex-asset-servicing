import React from "react";
import { useExerciseByKey } from "@daml/react";
import { AssetDeposit } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Asset.js";
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Grid, Typography, CircularProgress, Chip } from "@material-ui/core";
import { LifecycleEffects, AssetLifecycleRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { CreateEvent } from "@daml/ledger";
import { Forward } from "@material-ui/icons";
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
  const processEffects = useExerciseByKey(AssetLifecycleRule.AssetLifecycle_Process);

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
    await processEffects(deposit.payload.account.id, args);
    setIsApplyingEffect(false);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
      <DialogTitle>Lifecycle Effects: {effect.payload.label}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <Typography gutterBottom variant="body2">1.0 * <Chip variant="outlined" label={deposit.payload.asset.id.label} size="small" color="primary"/> <Chip variant="outlined" label={"v" + deposit.payload.asset.id.version} size="small"/></Typography>
          </Grid>
          <Grid item xs={2}>
            <Forward />
          </Grid>
          <Grid item xs={5}>
            {effect.payload.effects.map((e, i) => (
              <Typography gutterBottom variant="body2" key={i}>{e.quantity} * <Chip variant="outlined" label={e.id.label} size="small" color="primary"/> <Chip variant="outlined" label={"v" + e.id.version} size="small"/></Typography>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {!isApplyingEffect && <Button onClick={onClose} color="primary">
          Cancel
        </Button>}
        {isApplyingEffect ? (<CircularProgress size="small" />) : (<Button onClick={applyEffect} color="primary" autoFocus>Apply</Button>) }
      </DialogActions>
    </Dialog>
  );
}

export default LifecycleDialog;
