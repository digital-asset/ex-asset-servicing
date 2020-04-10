import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useStreamQuery, useExercise, useQuery } from "@daml/react";
import { EquityOption } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { CreateEvent } from "@daml/ledger";

type OptionProps = {
  option : CreateEvent<EquityOption>
}

function Option({ option } : OptionProps) {

  const options = useQuery(EquityOption);
  // const exerciseGive = useExercise(Asset.Give);

  return (
    <>
      <Contracts
        contracts={options.contracts}
        columns={[
          { name: "ContractId", path: "contractId" },
          { name: "Account", path: "payload.account.id.label" },
          { name: "Asset", path: "payload.asset.id.label" },
          { name: "Quantity", path: "payload.asset.quantity" },
        ]}
        actions={[]}
        //   { name: "Give", handle: (c, newOwner) => { exerciseGive(c.contractId, { newOwner: newOwner }); }, paramName: "New Owner" }
        // ]}
      />
    </>
  );
}

export default Option;