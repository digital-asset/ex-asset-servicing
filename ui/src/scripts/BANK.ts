import { AssetDeposit } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { AssetLifecycleRule, LifecycleEffects } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { isLocalDev, getParty } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml.js/asset-servicing-0.0.1/lib/Init";
import { getAccount, getAsset, emptySet } from "./Util";

export const setup = async (ledger : Ledger, bank : Party) => {
  const csd = isLocalDev ? "CSD" : getParty("CSD");
  const c1 = isLocalDev ? "Georg" : getParty("Georg Schneider");
  const c2 = isLocalDev ? "Eric" : getParty("Eric");
  const c3 = isLocalDev ? "Shaul" : getParty("Shaul");
  const c4 = isLocalDev ? "Yuval" : getParty("Yuval");

  // 0> Initial setup
  const [ , c1Acc ] = getAccount(bank, c1, "Georg@BANK");
  const [ , c2Acc ] = getAccount(bank, c2, "Eric@BANK");
  const [ , c3Acc ] = getAccount(bank, c3, "Shaul@BANK");
  const [ , c4Acc ] = getAccount(bank, c4, "Yuval@BANK");

  const [ , usd ]       = getAsset(csd, "USD", "1000000.0");
  const [ , eur ]       = getAsset(csd, "EUR", "5000000.0");
  const [ , chf ]       = getAsset(csd, "CHF", "10000000.0");
  const [ , csgn1 ]     = getAsset(csd, "CSGN.S", "15000.0");
  const [ , csgn2 ]     = getAsset(csd, "CSGN.S", "10000.0");
  const [ , ubsg ]      = getAsset(csd, "UBSG.S", "10000.0");
  const [ , csgnCall ]  = getAsset(csd, "CSGN-CALL-Sep19", "10000.0");
  const [ , ubsgPut ]   = getAsset(csd, "UBSG-PUT-Jul19", "1000.0");
  const [ , acbrc ]     = getAsset(csd, "UBSG-ACBRC-Dec19", "1000000.0");
  const [ , bond ]      = getAsset(csd, "CSGN-3Y-2.5-Jan20", "10000000.0");

  // 1> Create CSD Asset LifeCycle Rule
  console.log("Creating asset lifecycle rules");
  await ledger.create(AssetLifecycleRule, { account: c1Acc });
  await ledger.create(AssetLifecycleRule, { account: c2Acc });
  await ledger.create(AssetLifecycleRule, { account: c3Acc });
  await ledger.create(AssetLifecycleRule, { account: c4Acc });

  // 2> Deposits
  console.log("Creating asset deposits");
  await ledger.create(AssetDeposit, { account: c1Acc, asset: acbrc, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c1Acc, asset: bond, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c1Acc, asset: csgn1, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c2Acc, asset: csgnCall, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c2Acc, asset: ubsg, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c2Acc, asset: ubsgPut, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c3Acc, asset: chf, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c3Acc, asset: csgn2, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c4Acc, asset: usd, observers: emptySet<string>() });
  await ledger.create(AssetDeposit, { account: c4Acc, asset: eur, observers: emptySet<string>() });

  // 3> Init Done
  console.log("Creating init done");
  await ledger.create(InitDone, { sender: bank, receiver: bank });
};

export const teardown = async (ledger : Ledger, bank : Party) => {
  console.log("Archiving all contracts");
  await Promise.all((await ledger.query(AssetLifecycleRule)).map(c => ledger.archive(AssetLifecycleRule, c.contractId)));
  await Promise.all((await ledger.query(AssetDeposit)).map(c => ledger.archive(AssetDeposit, c.contractId)));
  await Promise.all((await ledger.query(LifecycleEffects)).map(c => ledger.archive(LifecycleEffects, c.contractId)));
  await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
  console.log("All contracts archived");
};
