import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerState, getContracts } from "../../context/LedgerContext";

export default function Position() {

  const ledger = useLedgerState();
  const txs = getContracts(ledger, "TradeStore.Transaction", "Transaction")
                .sort(function(c1, c2) {return c1.argument.transactionId.label - c2.argument.transactionId.label });

  return (
    <>
      <Contracts
        contracts={txs}
        columns={[
          ["Position Host", "argument.positionId.host"],
          ["Instrument Host", "argument.positionId.instrumentId.host"],
          ["Instrument Label", "argument.positionId.instrumentId.label"],
          ["Instrument Version", "argument.positionId.instrumentId.version"],
          ["Book", "argument.positionId.book"],
          ["Counterparty", "argument.positionId.counterParty"],
          ["Quantity", "argument.quantity"],
        ]}
      />
    </>
  );
}
