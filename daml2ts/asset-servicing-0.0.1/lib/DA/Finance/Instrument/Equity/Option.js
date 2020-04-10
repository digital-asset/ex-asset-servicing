"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Instrument/Equity/Option.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Types = require("../../../..//DA/Finance/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.EquityOption_SetObservers = ({
    decoder: function () { return jtv.object({
        newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
});
exports.EquityOption = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option:EquityOption',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        id: DA_Finance_Types.Id.decoder(),
        underlyingId: DA_Finance_Types.Id.decoder(),
        optionType: OptionType.decoder(),
        exerciseType: ExerciseType.decoder(),
        strike: daml.Numeric(10).decoder(),
        contractSize: daml.Numeric(10).decoder(),
        maturity: daml.Date.decoder(),
        settlementType: SettlementType.decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.EquityOption; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    EquityOption_SetObservers: {
        template: function () { return exports.EquityOption; },
        choiceName: 'EquityOption_SetObservers',
        argumentDecoder: exports.EquityOption_SetObservers.decoder,
        resultDecoder: function () { return daml.ContractId(exports.EquityOption).decoder(); },
    },
};
daml.registerTemplate(exports.EquityOption);
var SettlementType;
(function (SettlementType) {
    SettlementType["CASH"] = "CASH";
    SettlementType["PHYSICAL"] = "PHYSICAL";
})(SettlementType = exports.SettlementType || (exports.SettlementType = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(SettlementType);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (SettlementType) {
    SettlementType.decoder = function () { return jtv.oneOf(jtv.constant(SettlementType.CASH), jtv.constant(SettlementType.PHYSICAL)); };
})(SettlementType = exports.SettlementType || (exports.SettlementType = {}));
var ExerciseType;
(function (ExerciseType) {
    ExerciseType["EUROPEAN"] = "EUROPEAN";
    ExerciseType["AMERICAN"] = "AMERICAN";
})(ExerciseType = exports.ExerciseType || (exports.ExerciseType = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(ExerciseType);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (ExerciseType) {
    ExerciseType.decoder = function () { return jtv.oneOf(jtv.constant(ExerciseType.EUROPEAN), jtv.constant(ExerciseType.AMERICAN)); };
})(ExerciseType = exports.ExerciseType || (exports.ExerciseType = {}));
var OptionType;
(function (OptionType) {
    OptionType["PUT"] = "PUT";
    OptionType["CALL"] = "CALL";
})(OptionType = exports.OptionType || (exports.OptionType = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(OptionType);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (OptionType) {
    OptionType.decoder = function () { return jtv.oneOf(jtv.constant(OptionType.PUT), jtv.constant(OptionType.CALL)); };
})(OptionType = exports.OptionType || (exports.OptionType = {}));
//# sourceMappingURL=Option.js.map