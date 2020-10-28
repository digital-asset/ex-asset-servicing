import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { AssetLifecycleRule, LifecycleEffects } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { isLocalDev, getParty } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { getId, getAccount, getAsset, empty } from "./Util";
import { Issuer, RequestWarrantIssuance, WarrantIssuanceData, WarrantIssuanceRequest } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";
import { ExerciseType, OptionType, SettlementType } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";

export const setup = async (ledger : Ledger, issuer : Party) => {
  const depository = isLocalDev ? "CSD" : getParty("CSD");
  const agent = isLocalDev ? "BANK" : getParty("BANK");
  const issuerRoles = await ledger.query(Issuer);
  if (issuerRoles.length === 0) return;
  const issuanceData : WarrantIssuanceData = {
    label: "VOW.DE-CALL-130.0-20210321",
    terms: {
      underlying: getId(depository, "VOW.DE"),
      optionType: OptionType.CALL,
      strike: "130.0",
      exerciseType: ExerciseType.EUROPEAN,
      maturity: "2020-03-21",
      settlementType: SettlementType.PHYSICAL,
      contractSize: "100.0"
    },
    notional: "10000000.0",
    minimumDenomination: "1000.0"
  };
  await ledger.exercise(Issuer.RequestWarrantIssuance, issuerRoles[0].contractId, { agent, issuanceData })
  await ledger.create(InitDone, { sender: issuer, receiver: issuer });
};

export const teardown = async (ledger : Ledger, bank : Party) => {
  // await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
};
