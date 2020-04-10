"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Asset/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset = require("../../..//DA/Finance/Asset");
var DA_Finance_Types = require("../../..//DA/Finance/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.LifecycleEffects_SetObservers = ({
    decoder: function () { return jtv.object({
        newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
});
exports.LifecycleEffects = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:LifecycleEffects',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        id: DA_Finance_Types.Id.decoder(),
        consuming: daml.List(DA_Finance_Types.Asset).decoder(),
        effects: daml.List(DA_Finance_Types.Asset).decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.LifecycleEffects; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    LifecycleEffects_SetObservers: {
        template: function () { return exports.LifecycleEffects; },
        choiceName: 'LifecycleEffects_SetObservers',
        argumentDecoder: exports.LifecycleEffects_SetObservers.decoder,
        resultDecoder: function () { return daml.ContractId(exports.LifecycleEffects).decoder(); },
    },
};
daml.registerTemplate(exports.LifecycleEffects);
exports.AssetLifecycle_Process = ({
    decoder: function () { return jtv.object({
        lifecycleEffectsCid: daml.ContractId(exports.LifecycleEffects).decoder(),
        depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
        consumingDepositCids: daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit)).decoder(),
        accountIds: daml.Optional(daml.List(DA_Finance_Types.Id)).decoder(),
    }); },
});
exports.AssetLifecycleRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:AssetLifecycleRule',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        account: DA_Finance_Types.Account.decoder(),
    }); },
    Archive: {
        template: function () { return exports.AssetLifecycleRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    AssetLifecycle_Process: {
        template: function () { return exports.AssetLifecycleRule; },
        choiceName: 'AssetLifecycle_Process',
        argumentDecoder: exports.AssetLifecycle_Process.decoder,
        resultDecoder: function () { return daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit)).decoder(); },
    },
};
daml.registerTemplate(exports.AssetLifecycleRule);
//# sourceMappingURL=Lifecycle.js.map