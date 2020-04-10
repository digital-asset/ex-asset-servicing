"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Asset/Settlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset = require("../../..//DA/Finance/Asset");
var DA_Finance_Types = require("../../..//DA/Finance/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.AssetSettlement_Credit = ({
    decoder: function () { return jtv.object({
        asset: DA_Finance_Types.Asset.decoder(),
        ctrl: daml.Party.decoder(),
    }); },
});
exports.AssetSettlement_Debit = ({
    decoder: function () { return jtv.object({
        depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
    }); },
});
exports.AssetSettlement_Transfer = ({
    decoder: function () { return jtv.object({
        receiverAccountId: DA_Finance_Types.Id.decoder(),
        depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
    }); },
});
exports.AssetSettlementRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Settlement:AssetSettlementRule',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        account: DA_Finance_Types.Account.decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
        ctrls: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    AssetSettlement_Debit: {
        template: function () { return exports.AssetSettlementRule; },
        choiceName: 'AssetSettlement_Debit',
        argumentDecoder: exports.AssetSettlement_Debit.decoder,
        resultDecoder: function () { return DA_Finance_Types.Asset.decoder(); },
    },
    Archive: {
        template: function () { return exports.AssetSettlementRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    AssetSettlement_Credit: {
        template: function () { return exports.AssetSettlementRule; },
        choiceName: 'AssetSettlement_Credit',
        argumentDecoder: exports.AssetSettlement_Credit.decoder,
        resultDecoder: function () { return daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(); },
    },
    AssetSettlement_Transfer: {
        template: function () { return exports.AssetSettlementRule; },
        choiceName: 'AssetSettlement_Transfer',
        argumentDecoder: exports.AssetSettlement_Transfer.decoder,
        resultDecoder: function () { return daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(); },
    },
};
daml.registerTemplate(exports.AssetSettlementRule);
//# sourceMappingURL=Settlement.js.map