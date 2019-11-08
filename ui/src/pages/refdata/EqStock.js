import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContract, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function EqStock() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const stocks = getContracts(ledger, "RefData.EqStock", "EqStock");

  const exerciseChoice = async (c, ratio) => {
    const contractId = getContract(ledger, "Lifecycle.EqStock", "InstrumentLifecycle").contractId
    const command = {
      templateId: { moduleName: "Lifecycle.EqStock", entityName: "InstrumentLifecycle" },
      contractId,
      choice: "InstrumentLifecycle_StockSplit",
      argument: { instrumentId: c.argument.instrumentId, ratio },
      meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
    await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
  }

  const show = (cRow) => {
    return getContracts(ledger, "Lifecycle.EqStock", "InstrumentLifecycle")
            .filter(c => c.argument.instrumentHost === user.user && c.argument.instrumentHost === cRow.argument.instrumentId.host)
            .length > 0;
  }

  return (
    <>
      <Contracts
        contracts={stocks}
        columns={[
          ["Label", "argument.instrumentId.label"],
          ["Version", "argument.instrumentId.version"],
        ]}
        actions={[["Stock Split", show, exerciseChoice, "Ratio"]]}
      />
    </>
  );
}
