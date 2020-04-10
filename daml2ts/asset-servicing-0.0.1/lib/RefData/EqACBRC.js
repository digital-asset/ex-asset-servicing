"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from RefData/EqACBRC.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Types = require("..//Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.EqACBRC = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqACBRC:EqACBRC',
    keyDecoder: function () { return Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        instrumentId: Types.Id.decoder(),
        ccy: Types.Id.decoder(),
        notional: daml.Numeric(10).decoder(),
        barrier: daml.Numeric(10).decoder(),
        barrierIsHit: daml.Bool.decoder(),
        fixingDates: daml.List(daml.Date).decoder(),
        fixingIdx: daml.Int.decoder(),
        coupon: daml.Numeric(10).decoder(),
        underlying: Types.Id.decoder(),
        initialFixing: daml.Numeric(10).decoder(),
        obs: daml.List(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.EqACBRC; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.EqACBRC);
//# sourceMappingURL=EqACBRC.js.map