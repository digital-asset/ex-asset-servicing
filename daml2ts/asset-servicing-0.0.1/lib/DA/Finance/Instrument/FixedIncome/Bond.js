"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Instrument/FixedIncome/Bond.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Types = require("../../../..//DA/Finance/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.Bond = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.FixedIncome.Bond:Bond',
    keyDecoder: function () { return DA_Finance_Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        id: DA_Finance_Types.Id.decoder(),
        currencyId: DA_Finance_Types.Id.decoder(),
        couponDates: daml.List(daml.Date).decoder(),
        couponIdx: daml.Int.decoder(),
        coupon: daml.Numeric(10).decoder(),
        observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.Bond; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.Bond);
//# sourceMappingURL=Bond.js.map