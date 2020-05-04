import { AssetCategorization, AssetDeposit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { AssetLifecycleRule, LifecycleEffects } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { Currency } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Currency";
import { ACBRC } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { ACBRCFixingRule, ACBRCStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC/Lifecycle";
import { EquityCashDividend } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/CashDividend";
import { EquityOption, OptionType } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { EquityOptionStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option/Lifecycle";
import { EquityStock } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock";
import { EquityStockCashDividendRule, EquityStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock/Lifecycle";
import { EquityStockSplit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/StockSplit";
import { Bond } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond";
import { BondCouponRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond/Lifecycle";
import { Fixing } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/RefData/Fixing";
import { isLocalDev, getParty } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml2js/asset-servicing-0.0.1/lib/Init";
import { getAsset, getAccount, getOptionEuropeanCash, getId } from "./Util";

export const setup = async (ledger : Ledger, csd : Party) => {
  const bank = isLocalDev ? "BANK" : await getParty("BANK");
  const c1 = isLocalDev ? "Yuval" : await getParty("Yuval");
  const c2 = isLocalDev ? "Eric" : await getParty("Eric");
  const c3 = isLocalDev ? "Shaul" : await getParty("Shaul");
  const c4 = isLocalDev ? "Georg" : await getParty("Georg Schneider");

  // 0> Initial setup
  const [ , stkAcc ]       = getAccount(csd, bank, "BANK@CSD[STOCK]");
  const [ , drvAcc ]       = getAccount(csd, bank, "BANK@CSD[DERIV]");
  const [ , fixAcc ]       = getAccount(csd, bank, "BANK@CSD[FIXED]");

  const [ usdId, usd ]            = getAsset(csd, "USD", "1000000.0");
  const [ eurId, eur ]            = getAsset(csd, "EUR", "5000000.0");
  const [ chfId, chf ]            = getAsset(csd, "CHF", "10000000.0");
  const [ csgnId, csgn ]          = getAsset(csd, "CSGN.S", "25000.0");
  const [ ubsgId, ubsg ]          = getAsset(csd, "UBSG.S", "10000.0");
  const [ csgnCallId, csgnCall ]  = getAsset(csd, "CSGN-CALL-Sep19", "10000.0");
  const [ ubsgPutId, ubsgPut ]    = getAsset(csd, "UBSG-PUT-Jul19", "1000.0");
  const [ acbrcId, acbrc ]        = getAsset(csd, "UBSG-ACBRC-Dec19", "1000000.0");
  const [ bondId, bond ]          = getAsset(csd, "CSGN-3Y-2.5-Jan20", "10000000.0");

  // 1> Create CSD Asset LifeCycle Rule
  console.log("Creating asset lifecycle rules");
  await ledger.create(AssetLifecycleRule, { account: stkAcc });
  await ledger.create(AssetLifecycleRule, { account: drvAcc });
  await ledger.create(AssetLifecycleRule, { account: fixAcc });

  // 2> Create Asset Categories
  console.log("Creating asset categories");
  await Promise.all([
    ledger.create(AssetCategorization, { id: usdId, assetType: "Currency", assetClass: "FX", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: eurId, assetType: "Currency", assetClass: "FX", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: chfId, assetType: "Currency", assetClass: "FX", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: csgnId, assetType: "Stock", assetClass: "Equity", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: ubsgId, assetType: "Stock", assetClass: "Equity", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: csgnCallId, assetType: "Option", assetClass: "Equity", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: ubsgPutId, assetType: "Option", assetClass: "Equity", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: acbrcId, assetType: "Exotic", assetClass: "Equity", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
    ledger.create(AssetCategorization, { id: bondId, assetType: "Bond", assetClass: "FixedIncome", observers: { textMap: { [bank]: {}, [c1]: {}, [c2]: {}, [c3]: {}, [c4]: {} } } }),
  ]);

  // 3> Deposits
  console.log("Creating asset deposits");
  await ledger.create(AssetDeposit, { account: fixAcc, asset: usd, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: fixAcc, asset: eur, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: fixAcc, asset: chf, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: stkAcc, asset: csgn, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: stkAcc, asset: ubsg, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: drvAcc, asset: csgnCall, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: drvAcc, asset: ubsgPut, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: drvAcc, asset: acbrc, observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: fixAcc, asset: bond, observers: { textMap: {} } });

  // 4> Instruments
  console.log("Creating instruments");
  await Promise.all([
    ledger.create(Currency, { id: usdId, isoCode: "USD", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Currency, { id: eurId, isoCode: "EUR", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Currency, { id: chfId, isoCode: "CHF", observers: { textMap: { [bank]: {} } } })
  ]);

  await Promise.all([
    ledger.create(EquityStock, { id: csgnId, ccy: chfId, observers: { textMap: { [bank]: {} } } }),
    ledger.create(EquityStock, { id: ubsgId, ccy: chfId, observers: { textMap: { [bank]: {} } } })
  ]);

  await Promise.all([
    ledger.create(EquityOption, getOptionEuropeanCash(csgnCallId, csgnId, OptionType.CALL, "7.0", "100.0", "2019-09-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "CSGN-CALL-Oct19"), csgnId, OptionType.CALL, "7.0", "100.0", "2019-10-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "CSGN-CALL-Nov19"), csgnId, OptionType.CALL, "8.0", "100.0", "2019-11-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "CSGN-CALL-Dec19"), csgnId, OptionType.CALL, "8.0", "100.0", "2019-12-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "CSGN-CALL-Jan20"), csgnId, OptionType.CALL, "9.0", "100.0", "2020-01-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "CSGN-CALL-Feb20"), csgnId, OptionType.CALL, "9.0", "100.0", "2019-02-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "CSGN-CALL-Mar20"), csgnId, OptionType.CALL, "9.0", "100.0", "2019-03-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(ubsgPutId, ubsgId, OptionType.PUT, "9.0", "100.0", "2019-07-20", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "UBSG-PUT-Aug19"), ubsgId, OptionType.PUT, "9.5", "100.0", "2019-08-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "UBSG-PUT-Sep19"), ubsgId, OptionType.PUT, "9.5", "100.0", "2019-09-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "UBSG-PUT-Oct19"), ubsgId, OptionType.PUT, "9.5", "100.0", "2019-10-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "UBSG-PUT-Nov19"), ubsgId, OptionType.PUT, "10.0", "100.0", "2019-11-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "UBSG-PUT-Dec19"), ubsgId, OptionType.PUT, "10.0", "100.0", "2019-12-21", bank)),
    ledger.create(EquityOption, getOptionEuropeanCash(getId(csd, "UBSG-PUT-Jan20"), ubsgId, OptionType.PUT, "10.0", "100.0", "2020-01-21", bank))
  ]);

  await ledger.create(ACBRC, { id: acbrcId, underlyingId: ubsgId, currencyId: chfId, knockInBarrier: "0.8", knockInBarrierHit: false, callBarrier: "1.0", callBarrierHit: false, fixingDates: ["2019-06-15", "2019-09-15", "2019-12-15"], fixingIdx: "1", coupon: "0.05", initialFixing: "10.0", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Bond, { id: bondId, currencyId: chfId, couponDates: ["2018-01-12", "2019-01-12", "2020-01-12"], couponIdx: "1", coupon: "0.025", observers: { textMap: { [bank]: {} } } });

  // 5> Events
  console.log("Creating events");
  await ledger.create(EquityCashDividend, { id: csgnId, exDate: "2019-05-03", settlementDate: "2019-05-05", perShare: "0.26", observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityStockSplit, { id: ubsgId, exDate: "2019-08-15", rFactor: "0.5", observers: { textMap: { [bank]: {} } } });
  await Promise.all([
    ledger.create(Fixing, { id: ubsgId, currency: chfId, date: "2019-06-15", value: "9.0", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Fixing, { id: ubsgId, currency: chfId, date: "2019-09-15", value: "7.6", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Fixing, { id: ubsgId, currency: chfId, date: "2019-12-15", value: "10.4", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Fixing, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG.S", version: "1" }, currency: chfId, date: "2019-06-15", value: "4.5", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Fixing, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG.S", version: "1" }, currency: chfId, date: "2019-09-15", value: "3.8", observers: { textMap: { [bank]: {} } } }),
    ledger.create(Fixing, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG.S", version: "1" }, currency: chfId, date: "2019-12-15", value: "5.2", observers: { textMap: { [bank]: {} } } })
  ]);

  // 6> Lifecycle Rules
  console.log("Creating lifecycle rules");
  await ledger.create(EquityStockSplitRule, { signatories: { textMap: { [csd]: {} } } });
  await ledger.create(EquityOptionStockSplitRule, { signatories: { textMap: { [csd]: {} } } });
  await ledger.create(ACBRCStockSplitRule, { signatories: { textMap: { [csd]: {} } } });
  await ledger.create(EquityStockCashDividendRule, { signatories: { textMap: { [csd]: {} } } });
  await ledger.create(ACBRCFixingRule, { signatories: { textMap: { [csd]: {} } } });
  await ledger.create(BondCouponRule, { signatories: { textMap: { [csd]: {} } } });

  // 7> Init Done
  console.log("Creating init done");
  await ledger.create(InitDone, { sender: csd, receiver: csd });
};

export const teardown = async (ledger : Ledger, csd : Party) => {
  console.log("Archiving all contracts");
  await Promise.all((await ledger.query(AssetLifecycleRule)).map(c => ledger.archive(AssetLifecycleRule, c.contractId)));
  await Promise.all((await ledger.query(AssetCategorization)).map(c => ledger.archive(AssetCategorization, c.contractId)));
  await Promise.all((await ledger.query(AssetDeposit)).map(c => ledger.archive(AssetDeposit, c.contractId)));
  await Promise.all((await ledger.query(Currency)).map(c => ledger.archive(Currency, c.contractId)));
  await Promise.all((await ledger.query(EquityStock)).map(c => ledger.archive(EquityStock, c.contractId)));
  await Promise.all((await ledger.query(EquityOption)).map(c => ledger.archive(EquityOption, c.contractId)));
  await Promise.all((await ledger.query(ACBRC)).map(c => ledger.archive(ACBRC, c.contractId)));
  await Promise.all((await ledger.query(Bond)).map(c => ledger.archive(Bond, c.contractId)));
  await Promise.all((await ledger.query(EquityCashDividend)).map(c => ledger.archive(EquityCashDividend, c.contractId)));
  await Promise.all((await ledger.query(EquityStockSplit)).map(c => ledger.archive(EquityStockSplit, c.contractId)));
  await Promise.all((await ledger.query(Fixing)).map(c => ledger.archive(Fixing, c.contractId)));
  await Promise.all((await ledger.query(EquityStockSplitRule)).map(c => ledger.archive(EquityStockSplitRule, c.contractId)));
  await Promise.all((await ledger.query(EquityOptionStockSplitRule)).map(c => ledger.archive(EquityOptionStockSplitRule, c.contractId)));
  await Promise.all((await ledger.query(ACBRCStockSplitRule)).map(c => ledger.archive(ACBRCStockSplitRule, c.contractId)));
  await Promise.all((await ledger.query(EquityStockCashDividendRule)).map(c => ledger.archive(EquityStockCashDividendRule, c.contractId)));
  await Promise.all((await ledger.query(ACBRCFixingRule)).map(c => ledger.archive(ACBRCFixingRule, c.contractId)));
  await Promise.all((await ledger.query(BondCouponRule)).map(c => ledger.archive(BondCouponRule, c.contractId)));
  await Promise.all((await ledger.query(LifecycleEffects)).map(c => ledger.archive(LifecycleEffects, c.contractId)));
  await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
  console.log("All contracts archived");
};
