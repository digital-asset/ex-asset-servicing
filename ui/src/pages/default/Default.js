import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerState } from "../../context/LedgerContext";

function Default() {

  const ledger = useLedgerState();

  return (
    <>
      <Contracts contracts={ledger.contracts} />
    </>
  );
}

export default Default
