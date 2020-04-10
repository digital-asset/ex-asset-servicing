"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Tutorial.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Trade_Dvp = require(".//DA/Finance/Trade/Dvp");
var DA_Finance_Trade_Dvp_Settlement = require(".//DA/Finance/Trade/Dvp/Settlement");
var DA_Finance_Trade_SettlementInstruction = require(".//DA/Finance/Trade/SettlementInstruction");
var DA_Finance_Types = require(".//DA/Finance/Types");
var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types = require("@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.Accept = ({
    decoder: function () { return jtv.object({}); },
});
exports.DvpProposal = {
    templateId: '8709c7cf647cc053b613ed3289af65d9c93a20cb1862058daa21db7d5ea5dc6c:Tutorial:DvpProposal',
    keyDecoder: function () { return jtv.constant(undefined); },
    decoder: function () { return jtv.object({
        tradeId: DA_Finance_Types.Id.decoder(),
        asset: DA_Finance_Types.Asset.decoder(),
        proposerAccount: DA_Finance_Types.Account.decoder(),
        proposerBankAccount: DA_Finance_Types.Account.decoder(),
        proposerBankOwnAccount: DA_Finance_Types.Account.decoder(),
        counterpartyAccount: DA_Finance_Types.Account.decoder(),
        counterpartyBankAccount: DA_Finance_Types.Account.decoder(),
        counterpartyBankOwnAccount: DA_Finance_Types.Account.decoder(),
    }); },
    Archive: {
        template: function () { return exports.DvpProposal; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    Accept: {
        template: function () { return exports.DvpProposal; },
        choiceName: 'Accept',
        argumentDecoder: exports.Accept.decoder,
        resultDecoder: function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3(daml.ContractId(DA_Finance_Trade_Dvp.Dvp), daml.ContractId(DA_Finance_Trade_SettlementInstruction.SettlementInstruction), daml.ContractId(DA_Finance_Trade_Dvp_Settlement.DvpSettlementRule)).decoder(); },
    },
};
daml.registerTemplate(exports.DvpProposal);
//# sourceMappingURL=Tutorial.js.map