"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Lifecycle/Agreement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Lifecycle_Position = require("..//Lifecycle/Position");
var Types = require("..//Types");
var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types = require("@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.Decline = ({
    decoder: function () { return jtv.object({}); },
});
exports.LifecycleAgreement_Accept = ({
    decoder: function () { return jtv.object({}); },
});
exports.LifecycleAgreementRequest = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreementRequest',
    keyDecoder: function () { return jtv.constant(undefined); },
    decoder: function () { return jtv.object({
        instrumentHost: daml.Party.decoder(),
        positionHost: daml.Party.decoder(),
    }); },
    LifecycleAgreement_Accept: {
        template: function () { return exports.LifecycleAgreementRequest; },
        choiceName: 'LifecycleAgreement_Accept',
        argumentDecoder: exports.LifecycleAgreement_Accept.decoder,
        resultDecoder: function () { return daml.ContractId(exports.LifecycleAgreement).decoder(); },
    },
    Archive: {
        template: function () { return exports.LifecycleAgreementRequest; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    Decline: {
        template: function () { return exports.LifecycleAgreementRequest; },
        choiceName: 'Decline',
        argumentDecoder: exports.Decline.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.LifecycleAgreementRequest);
exports.LifecyclePosition_Create = ({
    decoder: function () { return jtv.object({
        instrumentId: Types.Id.decoder(),
        outcome: daml.List(pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(Types.Id, daml.Numeric(10))).decoder(),
    }); },
});
exports.LifecycleAgreement = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreement',
    keyDecoder: function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.Party, daml.Party).decoder(); },
    decoder: function () { return jtv.object({
        instrumentHost: daml.Party.decoder(),
        positionHost: daml.Party.decoder(),
    }); },
    LifecyclePosition_Create: {
        template: function () { return exports.LifecycleAgreement; },
        choiceName: 'LifecyclePosition_Create',
        argumentDecoder: exports.LifecyclePosition_Create.decoder,
        resultDecoder: function () { return daml.ContractId(Lifecycle_Position.LifecyclePosition).decoder(); },
    },
    Archive: {
        template: function () { return exports.LifecycleAgreement; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.LifecycleAgreement);
//# sourceMappingURL=Agreement.js.map