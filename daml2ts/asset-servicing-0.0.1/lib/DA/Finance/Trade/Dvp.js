"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Trade/Dvp.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Trade_Types = require("../../..//DA/Finance/Trade/Types");
var DA_Finance_Types = require("../../..//DA/Finance/Types");
var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types = require("@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.Dvp = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp:Dvp',
    keyDecoder: function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(DA_Finance_Types.Id, DA_Finance_Types.Id).decoder(); },
    decoder: function () { return jtv.object({
        masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
        tradeId: DA_Finance_Types.Id.decoder(),
        buyer: daml.Party.decoder(),
        status: DA_Finance_Trade_Types.SettlementStatus.decoder(),
        settlementDate: daml.Optional(daml.Date).decoder(),
        payments: daml.List(DA_Finance_Types.Asset).decoder(),
        deliveries: daml.List(DA_Finance_Types.Asset).decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.Dvp; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.Dvp);
//# sourceMappingURL=Dvp.js.map