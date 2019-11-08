import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContract, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function EqOption() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const options = getContracts(ledger, "RefData.EqOption", "EqOption");

  const exerciseChoice = async (c, ratio) => {
    const contractId = getContract(ledger, "Lifecycle.EqOption", "InstrumentLifecycle").contractId
    const command = {
      templateId: { moduleName: "Lifecycle.EqOption", entityName: "InstrumentLifecycle" },
      contractId,
      choice: "InstrumentLifecycle_StockSplit",
      argument: { instrumentId: c.argument.instrumentId, ratio },
      meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
    await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
  }

  const show = (cRow) => {
    return getContracts(ledger, "Lifecycle.EqOption", "InstrumentLifecycle")
            .filter(c => c.argument.instrumentHost === user.user && c.argument.instrumentHost === cRow.argument.instrumentId.host)
            .length > 0;
  }

  return (
    <>
      <Contracts
        contracts={options}
        columns={[
          ["Label", "argument.instrumentId.label"],
          ["Version", "argument.instrumentId.version"],
          ["Underlying", "argument.underlying.label"],
          ["Type", "argument.optionType"],
          ["Strike", "argument.strike"],
          ["ContractSize", "argument.contractSize"],
          ["Maturity", "argument.maturity"],
        ]}
        actions={[["Stock Split", show, exerciseChoice, "Ratio"]]}
      />
    </>
  );
}
