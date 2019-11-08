import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function Position() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const positions = getContracts(ledger, "TradeStore.Position", "Position")
                      .sort(function(c1, c2) {return c1.argument.positionId.instrumentId.label.localeCompare(c2.argument.positionId.instrumentId.label) });

  function getLifecycleContract(cRow) {
    return getContracts(ledger, "Lifecycle.Position", "LifecyclePosition")
              .find(c => c.argument.positionHost === cRow.argument.positionId.host && JSON.stringify(c.argument.instrumentId) === JSON.stringify(cRow.argument.positionId.instrumentId));
  }

  const exerciseChoice = async (c) => {
    const l = getLifecycleContract(c);
    if(l) {
      const command = {
        templateId: { moduleName: l.templateId.moduleName, entityName: l.templateId.entityName },
        contractId: l.contractId,
        choice: "Lifecycle",
        argument: { positionId: c.argument.positionId },
        meta: { ledgerEffectiveTime: 0 }
      };
      await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
      await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
    }
  }

  const show = (cRow) => {
    return !!getLifecycleContract(cRow);
  }

  return (
    <>
      <Contracts
        contracts={positions}
        columns={[
          ["Position Host", "argument.positionId.host"],
          ["Instrument Host", "argument.positionId.instrumentId.host"],
          ["Instrument Label", "argument.positionId.instrumentId.label"],
          ["Instrument Version", "argument.positionId.instrumentId.version"],
          ["Book", "argument.positionId.book"],
          ["Counterparty", "argument.positionId.counterParty"],
          ["Quantity", "argument.quantity"],
        ]}
        actions={[["Lifecycle", show, exerciseChoice]]}
      />
    </>
  );
}
