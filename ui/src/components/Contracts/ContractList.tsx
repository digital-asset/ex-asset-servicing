import React from "react";
import { CreateEvent } from "@daml/ledger";

type ContractsProps<T extends object> = {
  contracts : readonly CreateEvent<T>[]
  render : (c : CreateEvent<T>) => JSX.Element
}

function ContractList<T extends object>({ contracts, render } : ContractsProps<T>) {
  return (
    <>
      {contracts.map(render)}
    </>
  );
}

export default ContractList;