"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Trade/Dvp/Settlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset = require("../../../..//DA/Finance/Asset");
var DA_Finance_Trade_Dvp = require("../../../..//DA/Finance/Trade/Dvp");
var DA_Finance_Trade_SettlementInstruction = require("../../../..//DA/Finance/Trade/SettlementInstruction");
var DA_Finance_Types = require("../../../..//DA/Finance/Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.DvpSettlement_Process = ({
    decoder: function () { return jtv.object({
        dvpCid: daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
        paymentInstructionCids: daml.List(daml.ContractId(DA_Finance_Trade_SettlementInstruction.SettlementInstruction)).decoder(),
        deliveryInstructionCids: daml.List(daml.ContractId(DA_Finance_Trade_SettlementInstruction.SettlementInstruction)).decoder(),
        ctrl: daml.Party.decoder(),
    }); },
});
exports.DvpSettlementRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Settlement:DvpSettlementRule',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
    }); },
    DvpSettlement_Process: {
        template: function () { return exports.DvpSettlementRule; },
        choiceName: 'DvpSettlement_Process',
        argumentDecoder: exports.DvpSettlement_Process.decoder,
        resultDecoder: function () { return exports.DvpSettlement_Process_Result.decoder(); },
    },
    Archive: {
        template: function () { return exports.DvpSettlementRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.DvpSettlementRule);
exports.DvpSettlement_Process_Result = ({
    decoder: function () { return jtv.object({
        dvpCid: daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
        paymentDepositCids: daml.List(daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit))).decoder(),
        deliveryDepositCids: daml.List(daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit))).decoder(),
    }); },
});
//# sourceMappingURL=Settlement.js.map