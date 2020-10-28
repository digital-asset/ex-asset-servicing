import { isLocalDev, getParty } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { getAccount } from "./Util";
import { Agent, Depository, Issuer } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Issuance/Issuance";

export const setup = async (ledger : Ledger, depository : Party) => {
  // const issuer = isLocalDev ? "CORP" : getParty("CORP");
  // const agent = isLocalDev ? "BANK" : getParty("BANK");
  // const [ , account ]       = getAccount(depository, issuer, "CORP@CSD");
  // await ledger.create(Depository, { depository });
  // await ledger.create(Issuer, { depository, issuer, account });
  // await ledger.create(Agent, { depository, agent });
  await ledger.create(InitDone, { sender: depository, receiver: depository });
};

export const teardown = async (ledger : Ledger, csd : Party) => {
  // await Promise.all((await ledger.query(Depository)).map(c => ledger.archive(Depository, c.contractId)));
  // await Promise.all((await ledger.query(Issuer)).map(c => ledger.archive(Issuer, c.contractId)));
  // await Promise.all((await ledger.query(Agent)).map(c => ledger.archive(Agent, c.contractId)));
  await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
};
