import { isLocalDev, getParty } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { getAccount, getId } from "./Util";
import { Agent, Depository, Issuer } from "@daml.js/asset-servicing-0.0.1/lib/Roles";

export const setup = async (ledger : Ledger, depository : Party) => {
  const issuer = isLocalDev ? "BMW" : getParty("BMW");
  const agent = isLocalDev ? "DB" : getParty("DB");
  const investors = isLocalDev ? [ "INVESTOR1", "INVESTOR2", "INVESTOR3" ] : [ getParty("INVESTOR1"), getParty("INVESTOR2"), getParty("INVESTOR3") ];
  const assetId = getId(depository, "BMWG.DE");
  const issuerAccountAtDepository = getAccount(depository, agent, "BMW@CLEARSTREAM");
  const agentAccountAtAgent = getAccount(agent, agent, "DB@DB");
  const agentAccountAtDepository = getAccount(agent, agent, "DB@CLEARSTREAM");
  await ledger.create(Depository, { depository });
  await ledger.create(Issuer, { depository, issuer, assetId, depositoryAccount: issuerAccountAtDepository });
  await ledger.create(Agent, { depository, agent, investors, ownAccount: agentAccountAtAgent, depositoryAccount: agentAccountAtDepository });
  await ledger.create(InitDone, { sender: depository, receiver: depository });
};

export const teardown = async (ledger : Ledger, csd : Party) => {
  await Promise.all((await ledger.query(Depository)).map(c => ledger.archive(Depository, c.contractId)));
  await Promise.all((await ledger.query(Issuer)).map(c => ledger.archive(Issuer, c.contractId)));
  await Promise.all((await ledger.query(Agent)).map(c => ledger.archive(Agent, c.contractId)));
  await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
};
