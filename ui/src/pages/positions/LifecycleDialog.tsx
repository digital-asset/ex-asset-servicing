import React from "react";
import { useExerciseByKey } from "@daml/react";
import { AssetDeposit } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Asset.js";
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Grid, Typography, CircularProgress } from "@material-ui/core";
import { LifecycleEffects, AssetLifecycleRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { CreateEvent } from "@daml/ledger";
import { Forward } from "@material-ui/icons";

export type LifecycleDialogProps = {
  open: boolean
  deposit : CreateEvent<AssetDeposit> | undefined
  effect : CreateEvent<LifecycleEffects> | undefined
}

const LifecycleDialog : React.FC<LifecycleDialogProps> = ({ deposit, effect }) => {

  const [open, setOpen] = React.useState(false);
  const [isApplyingEffect, setIsApplyingEffect] = React.useState(false);
  const processEffects = useExerciseByKey(AssetLifecycleRule.AssetLifecycle_Process);

  if (!deposit || !effect) return (null);

  const closeDialog = () => {
    setOpen(false);
  };

  const applyEffect = async () => {
    setIsApplyingEffect(true);
    const args = {
      lifecycleEffectsCid: effect.contractId,
      depositCid: deposit.contractId,
      consumingDepositCids: [],
      accountIds: null
    };
    await processEffects(deposit.payload.account.id, args);
    setIsApplyingEffect(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Apply Lifecycle Effects</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <Typography>{deposit.payload.asset.quantity} {deposit.payload.asset.id.label} (v{deposit.payload.asset.id.version})</Typography>
          </Grid>
          <Grid item xs={2}>
            <Forward />
          </Grid>
          <Grid item xs={5}>
            {effect.payload.effects.map(e => (
              <Typography>{deposit.payload.asset.quantity} * {e.quantity} {e.id.label} (v{e.id.version})</Typography>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {!isApplyingEffect && <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>}
        {isApplyingEffect ? (<CircularProgress size="small" />) : (<Button onClick={applyEffect} color="primary" autoFocus>Apply</Button>) }

      </DialogActions>
    </Dialog>
  );
}

export default LifecycleDialog;
