"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Asset.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Types = require("../..//DA/Finance/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.AssetCategorization_SetObservers = ({
    decoder: function () { return jtv.object({
        newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
});
exports.AssetCategorization = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset:AssetCategorization',
    keyDecoder: function () { return jtv.constant(undefined); },
    decoder: function () { return jtv.object({
        id: DA_Finance_Types.Id.decoder(),
        assetType: daml.Text.decoder(),
        assetClass: daml.Text.decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.AssetCategorization; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    AssetCategorization_SetObservers: {
        template: function () { return exports.AssetCategorization; },
        choiceName: 'AssetCategorization_SetObservers',
        argumentDecoder: exports.AssetCategorization_SetObservers.decoder,
        resultDecoder: function () { return daml.ContractId(exports.AssetCategorization).decoder(); },
    },
};
daml.registerTemplate(exports.AssetCategorization);
exports.AssetDeposit_Merge = ({
    decoder: function () { return jtv.object({
        depositCids: daml.List(daml.ContractId(exports.AssetDeposit)).decoder(),
    }); },
});
exports.AssetDeposit_Split = ({
    decoder: function () { return jtv.object({
        quantities: daml.List(daml.Numeric(10)).decoder(),
    }); },
});
exports.AssetDeposit_SetObservers = ({
    decoder: function () { return jtv.object({
        newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
});
exports.AssetDeposit = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset:AssetDeposit',
    keyDecoder: function () { return jtv.constant(undefined); },
    decoder: function () { return jtv.object({
        account: DA_Finance_Types.Account.decoder(),
        asset: DA_Finance_Types.Asset.decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.AssetDeposit; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    AssetDeposit_Merge: {
        template: function () { return exports.AssetDeposit; },
        choiceName: 'AssetDeposit_Merge',
        argumentDecoder: exports.AssetDeposit_Merge.decoder,
        resultDecoder: function () { return daml.ContractId(exports.AssetDeposit).decoder(); },
    },
    AssetDeposit_Split: {
        template: function () { return exports.AssetDeposit; },
        choiceName: 'AssetDeposit_Split',
        argumentDecoder: exports.AssetDeposit_Split.decoder,
        resultDecoder: function () { return daml.List(daml.ContractId(exports.AssetDeposit)).decoder(); },
    },
    AssetDeposit_SetObservers: {
        template: function () { return exports.AssetDeposit; },
        choiceName: 'AssetDeposit_SetObservers',
        argumentDecoder: exports.AssetDeposit_SetObservers.decoder,
        resultDecoder: function () { return daml.ContractId(exports.AssetDeposit).decoder(); },
    },
};
daml.registerTemplate(exports.AssetDeposit);
//# sourceMappingURL=Asset.js.map