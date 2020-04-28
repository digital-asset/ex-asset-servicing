import { DamlLedgerContext } from "@daml/react/context";
import { AssetCategorization, AssetDeposit } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Asset";
import { AssetLifecycleRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Asset/Lifecycle";
import { Currency } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Currency";
import { ACBRC } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC";
import { ACBRCFixingRule, ACBRCStockSplitRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/ACBRC/Lifecycle";
import { EquityCashDividend } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/CashDividend";
import { EquityOption, ExerciseType, OptionType, SettlementType } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { EquityOptionStockSplitRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option/Lifecycle";
import { EquityStock } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock";
import { EquityStockCashDividendRule, EquityStockSplitRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Stock/Lifecycle";
import { EquityStockSplit } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/StockSplit";
import { Bond } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond";
import { BondCouponRule } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Instrument/FixedIncome/Bond/Lifecycle";
import { Fixing } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/RefData/Fixing";
import { Account, Asset, Id } from "@daml2ts/asset-servicing-0.0.1/lib/DA/Finance/Types";
import { Button, CircularProgress, Fab, Grid, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { DynamicFeed } from "@material-ui/icons";
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import React, { useContext, useState } from "react";
import { isLocalDev, partyMap } from "../config";
import { useUserState } from "../context/UserContext";

const CsdInitialization: React.FC = () => {
  const ledgerContext = useContext(DamlLedgerContext);
  const user = useUserState();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const csdParty = user.party;
  const ledger = ledgerContext?.ledger!;
  const bank = isLocalDev ? "PrivateBank" : partyMap.get("PrivateBank");

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  // 0> Initial setup
  const bankAccount: Account = { id: { signatories: { textMap: { [csdParty]: {} } }, label: "BANK@CSD", version: "0" }, owner: bank, provider: csdParty };
  const createAsset = (signatory: string, label: string, quantity: string): [Id, Asset] => {
    const id: Id = { signatories: { textMap: { [signatory]: {} } }, label: label, version: "0" };
    const asset: Asset = { id, quantity };
    return [id, asset];
  }
  const usd = createAsset(csdParty, "USD", "1000000.0");
  const eur = createAsset(csdParty, "EUR", "5000000.0");
  const chf = createAsset(csdParty, "CHF", "10000000.0");
  const csgn = createAsset(csdParty, "CSGN.S", "25000.0");
  const ubsg = createAsset(csdParty, "UBSG-PUT-Jul19", "1000.0");
  const csgnCall = createAsset(csdParty, "CSGN-CALL-Sep19", "10000.0");
  const ubsgPut = createAsset(csdParty, "UBSG-PUT-Jul19", "1000.0");
  const acbrc = createAsset(csdParty, "UBSG-ACBRC-Dec19", "1000000.0");
  const bond = createAsset(csdParty, "CSGN-3Y-2.5-Jan20", "10000000.0");

  const executeLedgerCommants = async () => {
    const executeAll = async () => {
      console.log("Submitting Ledger commands...");

      // 1> Create CSD Asset LifeCycle Rule
      await ledger.create(AssetLifecycleRule, { account: bankAccount });

      // 2> Create Asset Categories
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
      await ledger.create(Currency, { id: usd[0], isoCode: "USD", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Currency, { id: eur[0], isoCode: "EUR", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Currency, { id: chf[0], isoCode: "CHF", observers: { textMap: { [bank]: {} } } });

      await ledger.create(EquityStock, { id: csgn[0], ccy: chf[0], observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityStock, { id: ubsg[0], ccy: chf[0], observers: { textMap: { [bank]: {} } } });

      await ledger.create(EquityOption, { id: csgnCall[0], underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "7.0", contractSize: "100.0", maturity: "2019-09-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "CSGN-CALL-Oct19", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "7.0", contractSize: "100.0", maturity: "2019-10-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "CSGN-CALL-Nov19", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "8.0", contractSize: "100.0", maturity: "2019-11-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "CSGN-CALL-Dec19", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "8.0", contractSize: "100.0", maturity: "2019-12-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "CSGN-CALL-Jan20", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2020-01-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "CSGN-CALL-Feb20", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2019-02-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "CSGN-CALL-Mar20", version: "0" }, underlyingId: csgn[0], optionType: OptionType.CALL, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2019-03-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });

      await ledger.create(EquityOption, { id: ubsgPut[0], underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.0", contractSize: "100.0", maturity: "2019-07-20", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Aug19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.5", contractSize: "100.0", maturity: "2019-08-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Sep19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.5", contractSize: "100.0", maturity: "2019-09-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Oct19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "9.5", contractSize: "100.0", maturity: "2019-10-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Nov19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "10.0", contractSize: "100.0", maturity: "2019-11-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Dec19", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "10.0", contractSize: "100.0", maturity: "2019-12-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityOption, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Jan20", version: "0" }, underlyingId: ubsg[0], optionType: OptionType.PUT, exerciseType: ExerciseType.EUROPEAN, strike: "10.0", contractSize: "100.0", maturity: "2020-01-21", settlementType: SettlementType.CASH, observers: { textMap: { [bank]: {} } } });

      await ledger.create(ACBRC, { id: acbrc[0], underlyingId: ubsg[0], currencyId: chf[0], knockInBarrier: "0.8", knockInBarrierHit: false, callBarrier: "1.0", callBarrierHit: false, fixingDates: ["2018-01-21", "2019-01-21", "2020-01-21"], fixingIdx: "1", coupon: "0.05", initialFixing: "10.0", observers: { textMap: { [bank]: {} } } });

      await ledger.create(Bond, { id: bond[0], currencyId: chf[0], couponDates: ["2018-01-12", "2019-01-12", "2020-01-12"], couponIdx: "1", coupon: "0.025", observers: { textMap: { [bank]: {} } } });

      // 5> Events
      await ledger.create(EquityCashDividend, { id: csgn[0], exDate: "2019-05-03", settlementDate: "2019-05-05", perShare: "0.26", observers: { textMap: { [bank]: {} } } });
      await ledger.create(EquityStockSplit, { id: ubsg[0], exDate: "2019-08-15", rFactor: "0.5", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Fixing, { id: ubsg[0], currency: chf[0], date: "2019-06-15", value: "9.0", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Fixing, { id: ubsg[0], currency: chf[0], date: "2019-09-15", value: "7.6", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Fixing, { id: ubsg[0], currency: chf[0], date: "2019-12-15", value: "10.4", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Fixing, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Jul19", version: "1" }, currency: chf[0], date: "2019-06-15", value: "4.5", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Fixing, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Jul19", version: "1" }, currency: chf[0], date: "2019-09-15", value: "3.8", observers: { textMap: { [bank]: {} } } });
      await ledger.create(Fixing, { id: { signatories: { textMap: { [csdParty]: {} } }, label: "UBSG-PUT-Jul19", version: "1" }, currency: chf[0], date: "2019-12-15", value: "5.2", observers: { textMap: { [bank]: {} } } });

      // 6> Lifecycle Rules
      await ledger.create(EquityStockSplitRule, { signatories: { textMap: { [csdParty]: {} } } });
      await ledger.create(EquityOptionStockSplitRule, { signatories: { textMap: { [csdParty]: {} } } });
      await ledger.create(ACBRCStockSplitRule, { signatories: { textMap: { [csdParty]: {} } } });
      await ledger.create(EquityStockCashDividendRule, { signatories: { textMap: { [csdParty]: {} } } });
      await ledger.create(ACBRCFixingRule, { signatories: { textMap: { [csdParty]: {} } } });
      await ledger.create(BondCouponRule, { signatories: { textMap: { [csdParty]: {} } } });
    }

    setLoading(true);
    await executeAll()
      .then(() => {
        console.log("All ledger commands successfully executed");
        setSuccess(true);
      })
      .catch((error) => {
        console.log("Exception occurred:\n" + JSON.stringify(error))
        setError(JSON.stringify(error));
      })
      .finally(() => setLoading(false));
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={4} className={classes.root}>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          endIcon={<DynamicFeed />}
          disabled={loading || success}
          className={buttonClassname}
          onClick={() => executeLedgerCommants()}>
          Initialize Ledger
        </Button>
      </Grid>
      <Grid item>
        {loading && <CircularProgress size={68} className={classes.buttonProgress} />}
        {success && <Fab className={classes.buttonSuccess}><CheckIcon /></Fab>}
        {error && <div>Error occurred: ${error}</div>}
      </Grid>
    </Grid>
  );

};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 200,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    marginLeft: -35,
  },
}));

export default CsdInitialization;