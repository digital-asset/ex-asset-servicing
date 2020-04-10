"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from RefData/EqOption.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Types = require("..//Types");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.EqOption = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqOption:EqOption',
    keyDecoder: function () { return Types.Id.decoder(); },
    decoder: function () { return jtv.object({
        instrumentId: Types.Id.decoder(),
        underlying: Types.Id.decoder(),
        optionType: OptionType.decoder(),
        strike: daml.Numeric(10).decoder(),
        contractSize: daml.Numeric(10).decoder(),
        maturity: daml.Date.decoder(),
        obs: daml.List(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.EqOption; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
};
daml.registerTemplate(exports.EqOption);
var OptionType;
(function (OptionType) {
    OptionType["Put"] = "Put";
    OptionType["Call"] = "Call";
})(OptionType = exports.OptionType || (exports.OptionType = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(OptionType);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (OptionType) {
    OptionType.decoder = function () { return jtv.oneOf(jtv.constant(OptionType.Put), jtv.constant(OptionType.Call)); };
})(OptionType = exports.OptionType || (exports.OptionType = {}));
//# sourceMappingURL=EqOption.js.map