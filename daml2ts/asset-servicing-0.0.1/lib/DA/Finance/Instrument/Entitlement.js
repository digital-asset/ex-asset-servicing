"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Instrument/Entitlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset_Lifecycle = require("../../..//DA/Finance/Asset/Lifecycle");
var DA_Finance_Types = require("../../..//DA/Finance/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.Entitlement_Lifecycle = ({
    decoder: function () { return jtv.object({}); },
});
exports.Entitlement_SetObservers = ({
    decoder: function () { return jtv.object({
        newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
});
exports.Entitlement = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Entitlement:Entitlement',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        id: DA_Finance_Types.Id.decoder(),
        settlementDate: daml.Date.decoder(),
        underlying: DA_Finance_Types.Asset.decoder(),
        payment: daml.Optional(DA_Finance_Types.Asset).decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Entitlement_SetObservers: {
        template: function () { return exports.Entitlement; },
        choiceName: 'Entitlement_SetObservers',
        argumentDecoder: exports.Entitlement_SetObservers.decoder,
        resultDecoder: function () { return daml.ContractId(exports.Entitlement).decoder(); },
    },
    Archive: {
        template: function () { return exports.Entitlement; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    Entitlement_Lifecycle: {
        template: function () { return exports.Entitlement; },
        choiceName: 'Entitlement_Lifecycle',
        argumentDecoder: exports.Entitlement_Lifecycle.decoder,
        resultDecoder: function () { return daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(); },
    },
};
daml.registerTemplate(exports.Entitlement);
//# sourceMappingURL=Entitlement.js.map