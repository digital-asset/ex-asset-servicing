import { isLocalDev, getParty } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { getId, } from "./Util";
import { WarrantIssuanceData } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ExerciseType, OptionType } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";

export const setup = async (ledger : Ledger, issuer : Party) => {
  const depository = isLocalDev ? "CLEARSTREAM" : getParty("CLEARSTREAM");
  const agent = isLocalDev ? "DB" : getParty("DB");
  const issuerRoles = await ledger.query(Issuer);
  if (issuerRoles.length === 0) return;
  const issuanceData : WarrantIssuanceData = {
    label: "BMWG.DE-CALL-50.0-20210321",
    terms: {
      underlying: getId(depository, "BMWG.DE"),
      optionType: OptionType.CALL,
      strike: "50.0",
      exerciseType: ExerciseType.EUROPEAN,
      expiry: "2021-03-21",
      contractSize: "100.0"
    },
    issueSize: "10000000.0",
    minimumDenomination: "1000.0"
  };
  await ledger.exercise(Issuer.RequestWarrantIssuance, issuerRoles[0].contractId, { agent, issuanceData })
  await ledger.create(InitDone, { sender: issuer, receiver: issuer });
};

export const teardown = async (ledger : Ledger, bank : Party) => {
  await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
};
