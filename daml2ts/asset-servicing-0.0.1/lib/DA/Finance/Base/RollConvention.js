"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Base/RollConvention.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.RollConventionEnum = ({
    decoder: function () { return jtv.oneOf(jtv.object({ tag: jtv.constant('EOM'), value: jtv.lazy(function () { return daml.Unit.decoder(); }) }), jtv.object({ tag: jtv.constant('DOM'), value: jtv.lazy(function () { return daml.Int.decoder(); }) })); },
});
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(exports.RollConventionEnum);
var PeriodEnum;
(function (PeriodEnum) {
    PeriodEnum["D"] = "D";
    PeriodEnum["M"] = "M";
    PeriodEnum["W"] = "W";
    PeriodEnum["Y"] = "Y";
})(PeriodEnum = exports.PeriodEnum || (exports.PeriodEnum = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(PeriodEnum);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (PeriodEnum) {
    PeriodEnum.decoder = function () { return jtv.oneOf(jtv.constant(PeriodEnum.D), jtv.constant(PeriodEnum.M), jtv.constant(PeriodEnum.W), jtv.constant(PeriodEnum.Y)); };
})(PeriodEnum = exports.PeriodEnum || (exports.PeriodEnum = {}));
exports.Period = ({
    decoder: function () { return jtv.object({
        period: PeriodEnum.decoder(),
        periodMultiplier: daml.Int.decoder(),
    }); },
});
//# sourceMappingURL=RollConvention.js.map