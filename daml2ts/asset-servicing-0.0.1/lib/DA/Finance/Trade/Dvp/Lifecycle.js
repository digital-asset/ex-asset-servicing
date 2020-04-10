"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Trade/Dvp/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset_Lifecycle = require("../../../..//DA/Finance/Asset/Lifecycle");
var DA_Finance_Trade_Dvp = require("../../../..//DA/Finance/Trade/Dvp");
var DA_Finance_Types = require("../../../..//DA/Finance/Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.DvpLifecycle_Process = ({
    decoder: function () { return jtv.object({
        dvpCid: daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
        lifecycleEffectsCid: daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
        ctrl: daml.Party.decoder(),
    }); },
});
exports.DvpLifecycleRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Lifecycle:DvpLifecycleRule',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
    }); },
    DvpLifecycle_Process: {
        template: function () { return exports.DvpLifecycleRule; },
        choiceName: 'DvpLifecycle_Process',
        argumentDecoder: exports.DvpLifecycle_Process.decoder,
        resultDecoder: function () { return daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(); },
    },
    Archive: {
        template: function () { return exports.DvpLifecycleRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.DvpLifecycleRule);
//# sourceMappingURL=Lifecycle.js.map