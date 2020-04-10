"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Lifecycle/Position.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Types = require("..//Types");
var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types = require("@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.Lifecycle = ({
    decoder: function () { return jtv.object({
        positionId: Types.PositionId.decoder(),
    }); },
});
exports.LifecyclePosition = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Position:LifecyclePosition',
    keyDecoder: function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.Party, Types.Id).decoder(); },
    decoder: function () { return jtv.object({
        positionHost: daml.Party.decoder(),
        instrumentId: Types.Id.decoder(),
        outcome: daml.List(pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(Types.Id, daml.Numeric(10))).decoder(),
    }); },
    Archive: {
        template: function () { return exports.LifecyclePosition; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    Lifecycle: {
        template: function () { return exports.LifecyclePosition; },
        choiceName: 'Lifecycle',
        argumentDecoder: exports.Lifecycle.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.LifecyclePosition);
//# sourceMappingURL=Position.js.map