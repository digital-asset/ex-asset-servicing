"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Lifecycle/EqOption.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Types = require("..//Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.InstrumentLifecycle_StockSplit = ({
    decoder: function () { return jtv.object({
        instrumentId: Types.Id.decoder(),
        ratio: daml.Numeric(10).decoder(),
    }); },
});
exports.InstrumentLifecycle = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.EqOption:InstrumentLifecycle',
    keyDecoder: function () { return daml.Party.decoder(); },
    decoder: function () { return jtv.object({
        instrumentHost: daml.Party.decoder(),
        positionHosts: daml.List(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.InstrumentLifecycle; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    InstrumentLifecycle_StockSplit: {
        template: function () { return exports.InstrumentLifecycle; },
        choiceName: 'InstrumentLifecycle_StockSplit',
        argumentDecoder: exports.InstrumentLifecycle_StockSplit.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.InstrumentLifecycle);
//# sourceMappingURL=EqOption.js.map