"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Instrument/Equity/Option/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset_Lifecycle = require("../../../../..//DA/Finance/Asset/Lifecycle");
var DA_Finance_Instrument_Entitlement = require("../../../../..//DA/Finance/Instrument/Entitlement");
var DA_Finance_Instrument_Equity_Option = require("../../../../..//DA/Finance/Instrument/Equity/Option");
var DA_Finance_Instrument_Equity_StockSplit = require("../../../../..//DA/Finance/Instrument/Equity/StockSplit");
var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types = require("@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.EquityOptionStockSplit_Lifecycle = ({
    decoder: function () { return jtv.object({
        optionCid: daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption).decoder(),
        stockSplitCid: daml.ContractId(DA_Finance_Instrument_Equity_StockSplit.EquityStockSplit).decoder(),
    }); },
});
exports.EquityOptionStockSplitRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option.Lifecycle:EquityOptionStockSplitRule',
    keyDecoder: function () { return pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(); },
    decoder: function () { return jtv.object({
        signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.EquityOptionStockSplitRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    EquityOptionStockSplit_Lifecycle: {
        template: function () { return exports.EquityOptionStockSplitRule; },
        choiceName: 'EquityOptionStockSplit_Lifecycle',
        argumentDecoder: exports.EquityOptionStockSplit_Lifecycle.decoder,
        resultDecoder: function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption), daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects)).decoder(); },
    },
};
daml.registerTemplate(exports.EquityOptionStockSplitRule);
exports.EquityOptionStockSplit_Result = ({
    decoder: function () { return jtv.object({
        optionCid: daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption).decoder(),
        lifecycleEffectsCid: daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
    }); },
});
exports.EquityOptionExercise_Lifecycle = ({
    decoder: function () { return jtv.object({
        optionCid: daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption).decoder(),
        underlyingPrice: daml.Optional(daml.Numeric(10)).decoder(),
        entitlementIdLabel: daml.Text.decoder(),
        settlementDate: daml.Date.decoder(),
    }); },
});
exports.EquityOptionExerciseRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option.Lifecycle:EquityOptionExerciseRule',
    keyDecoder: function () { return pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(); },
    decoder: function () { return jtv.object({
        signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    EquityOptionExercise_Lifecycle: {
        template: function () { return exports.EquityOptionExerciseRule; },
        choiceName: 'EquityOptionExercise_Lifecycle',
        argumentDecoder: exports.EquityOptionExercise_Lifecycle.decoder,
        resultDecoder: function () { return exports.EquityOptionExercise_Result.decoder(); },
    },
    Archive: {
        template: function () { return exports.EquityOptionExerciseRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.EquityOptionExerciseRule);
exports.EquityOptionExercise_Result = ({
    decoder: function () { return jtv.object({
        entitlementCid: daml.ContractId(DA_Finance_Instrument_Entitlement.Entitlement).decoder(),
        lifecycleEffectsCid: daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
    }); },
});
//# sourceMappingURL=Lifecycle.js.map