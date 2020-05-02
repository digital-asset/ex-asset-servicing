import { AssetCategorization, AssetDeposit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { AssetLifecycleRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { Currency } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Currency";
import { ACBRC } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { ACBRCFixingRule, ACBRCStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC/Lifecycle";
import { EquityCashDividend } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/CashDividend";
import { EquityOption, ExerciseType, OptionType, SettlementType } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { EquityOptionStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option/Lifecycle";
import { EquityStock } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock";
import { EquityStockCashDividendRule, EquityStockSplitRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock/Lifecycle";
import { EquityStockSplit } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/StockSplit";
import { Bond } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond";
import { BondCouponRule } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond/Lifecycle";
import { Fixing } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/RefData/Fixing";
import { Account, Asset, Id } from "@daml2js/asset-servicing-0.0.1/lib/DA/Finance/Types";
import { isLocalDev, partyMap } from "../config";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";
import { InitDone } from "@daml2js/asset-servicing-0.0.1/lib/Init";

export const setup = async (ledger : Ledger, csd : Party) => {
  const bank = isLocalDev ? "BANK" : partyMap.get("BANK");

  // 0> Initial setup
  const bankAccount: Account = { id: { signatories: { textMap: { [csd]: {} } }, label: "BANK@CSD", version: "0" }, owner: bank, provider: csd };
  const createAsset = (signatory: string, label: string, quantity: string): [Id, Asset] => {
    const id : Id = { signatories: { textMap: { [signatory]: {} } }, label: label, version: "0" };
    const asset : Asset = { id, quantity };
    return [id, asset];
  }

  const usd       = createAsset(csd, "USD", "1000000.0");
  const eur       = createAsset(csd, "EUR", "5000000.0");
  const chf       = createAsset(csd, "CHF", "10000000.0");
  const csgn      = createAsset(csd, "CSGN.S", "25000.0");
  const ubsg      = createAsset(csd, "UBSG-PUT-Jul19", "1000.0");
  const csgnCall  = createAsset(csd, "CSGN-CALL-Sep19", "10000.0");
  const ubsgPut   = createAsset(csd, "UBSG-PUT-Jul19", "1000.0");
  const acbrc     = createAsset(csd, "UBSG-ACBRC-Dec19", "1000000.0");
  const bond      = createAsset(csd, "CSGN-3Y-2.5-Jan20", "10000000.0");

  // 1> Create CSD Asset LifeCycle Rule
  console.log("Creating asset lifecycle rules");
  await ledger.create(AssetLifecycleRule, { account: bankAccount });

  // 2> Create Asset Categories
  console.log("Creating asset categories");
  await ledger.create(AssetCategorization, { id: usd[0], assetType: "Currency", assetClass: "FX", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: eur[0], assetType: "Currency", assetClass: "FX", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: chf[0], assetType: "Currency", assetClass: "FX", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: csgn[0], assetType: "Stock", assetClass: "Equity", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: ubsg[0], assetType: "Stock", assetClass: "Equity", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: csgnCall[0], assetType: "Option", assetClass: "Equity", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: ubsgPut[0], assetType: "Option", assetClass: "Equity", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: acbrc[0], assetType: "Exotic", assetClass: "Equity", observers: { textMap: { [bank]: {} } } });
  await ledger.create(AssetCategorization, { id: bond[0], assetType: "Bond", assetClass: "FixedIncome", observers: { textMap: { [bank]: {} } } });

  // 3> Deposits
  console.log("Creating asset deposits");
  await ledger.create(AssetDeposit, { account: bankAccount, asset: usd[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: eur[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: chf[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: csgn[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: ubsg[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: csgnCall[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: ubsgPut[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: acbrc[1], observers: { textMap: {} } });
  await ledger.create(AssetDeposit, { account: bankAccount, asset: bond[1], observers: { textMap: {} } });

  // 4> Instruments
  console.log("Creating instruments");
  await ledger.create(Currency, { id: usd[0], isoCode: "USD", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Currency, { id: eur[0], isoCode: "EUR", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Currency, { id: chf[0], isoCode: "CHF", observers: { textMap: { [bank]: {} } } });

  await ledger.create(EquityStock, { id: csgn[0], ccy: chf[0], observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityStock, { id: ubsg[0], ccy: chf[0], observers: { textMap: { [bank]: {} } } });

  await ledger.create(EquityOption, { id: csgnCall[0], underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "7.0", contractSize: "100.0", maturity: "2019-09-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "CSGN-CALL-Oct19", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "7.0", contractSize: "100.0", maturity: "2019-10-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "CSGN-CALL-Nov19", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "8.0", contractSize: "100.0", maturity: "2019-11-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "CSGN-CALL-Dec19", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "8.0", contractSize: "100.0", maturity: "2019-12-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "CSGN-CALL-Jan20", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2020-01-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "CSGN-CALL-Feb20", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2019-02-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "CSGN-CALL-Mar20", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2019-03-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });

  await ledger.create(EquityOption, { id: ubsgPut[0], underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2019-07-20", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Aug19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.5", contractSize: "100.0", maturity: "2019-08-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Sep19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.5", contractSize: "100.0", maturity: "2019-09-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Oct19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.5", contractSize: "100.0", maturity: "2019-10-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Nov19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "10.0", contractSize: "100.0", maturity: "2019-11-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Dec19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "10.0", contractSize: "100.0", maturity: "2019-12-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityOption, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Jan20", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "10.0", contractSize: "100.0", maturity: "2020-01-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });

  await ledger.create(ACBRC, { id: acbrc[0], underlyingId: ubsg[0], currencyId: chf[0], knockInBarrier: "0.8", knockInBarrierHit: false, callBarrier: "1.0", callBarrierHit: false, fixingDates: ["2018-01-21", "2019-01-21", "2020-01-21"], fixingIdx: "1", coupon: "0.05", initialFixing: "10.0", observers: { textMap: { [bank]: {} } } });

  await ledger.create(Bond, { id: bond[0], currencyId: chf[0], couponDates: ["2018-01-12", "2019-01-12", "2020-01-12"], couponIdx: "1", coupon: "0.025", observers: { textMap: { [bank]: {} } } });

  // 5> Events
  console.log("Creating events");
  await ledger.create(EquityCashDividend, { id: csgn[0], exDate: "2019-05-03", settlementDate: "2019-05-05", perShare: "0.26", observers: { textMap: { [bank]: {} } } });
  await ledger.create(EquityStockSplit, { id: ubsg[0], exDate: "2019-08-15", rFactor: "0.5", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Fixing, { id: ubsg[0], currency: chf[0], date: "2019-06-15", value: "9.0", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Fixing, { id: ubsg[0], currency: chf[0], date: "2019-09-15", value: "7.6", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Fixing, { id: ubsg[0], currency: chf[0], date: "2019-12-15", value: "10.4", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Fixing, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Jul19", version: "1" }, currency: chf[0], date: "2019-06-15", value: "4.5", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Fixing, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Jul19", version: "1" }, currency: chf[0], date: "2019-09-15", value: "3.8", observers: { textMap: { [bank]: {} } } });
  await ledger.create(Fixing, { id: { signatories: { textMap: { [csd]: {} } }, label: "UBSG-PUT-Jul19", version: "1" }, currency: chf[0], date: "2019-12-15", value: "5.2", observers: { textMap: { [bank]: {} } } });

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
  await ledger.create(InitDone, { sender: csd, receiver: bank });
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
  await Promise.all((await ledger.query(InitDone)).map(c => ledger.archive(InitDone, c.contractId)));
  console.log("All contracts archived");
};
