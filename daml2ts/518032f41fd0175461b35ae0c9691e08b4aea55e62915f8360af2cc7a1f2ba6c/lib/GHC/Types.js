"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from GHC/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Ordering;
(function (Ordering) {
    Ordering["LT"] = "LT";
    Ordering["EQ"] = "EQ";
    Ordering["GT"] = "GT";
})(Ordering = exports.Ordering || (exports.Ordering = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(Ordering);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (Ordering) {
    Ordering.decoder = function () { return jtv.oneOf(jtv.constant(Ordering.LT), jtv.constant(Ordering.EQ), jtv.constant(Ordering.GT)); };
})(Ordering = exports.Ordering || (exports.Ordering = {}));
//# sourceMappingURL=Types.js.map