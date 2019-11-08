import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContract, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function EqACBRC() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const acbrcs = getContracts(ledger, "RefData.EqACBRC", "EqACBRC");

  const exerciseChoice = async (c, fixing) => {
    const contractId = getContract(ledger, "Lifecycle.EqACBRC", "InstrumentLifecycle").contractId
    const command = {
      templateId: { moduleName: "Lifecycle.EqACBRC", entityName: "InstrumentLifecycle" },
      contractId,
      choice: "InstrumentLifecycle_ObserveNextFixing",
      argument: { instrumentId: c.argument.instrumentId, fixing },
      meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
    await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
  }

  const show = (cRow) => {
    return getContracts(ledger, "Lifecycle.EqACBRC", "InstrumentLifecycle")
            .filter(c => c.argument.instrumentHost === user.user && c.argument.instrumentHost === cRow.argument.instrumentId.host)
            .length > 0;
  }

  return (
    <>
      <Contracts
        contracts={acbrcs}
        columns={[
          ["Label", "argument.instrumentId.label"],
          ["Version", "argument.instrumentId.version"],
          ["Notional", "argument.notional"],
          ["Barrier", "argument.barrier"],
          ["Barrier Is Hit", "argument.barrierIsHit"],
          ["Fixing Dates", "argument.fixingDates"],
          ["Fixing Idx", "argument.fixingIdx"],
          ["Coupon", "argument.coupon"],
          ["Underlying", "argument.underlying.label"],
          ["Initial Fixing", "argument.initialFixing"],
        ]}
        actions={[["Observe Fixing", show, exerciseChoice, "Fixing"]]}
      />
    </>
  );
}
