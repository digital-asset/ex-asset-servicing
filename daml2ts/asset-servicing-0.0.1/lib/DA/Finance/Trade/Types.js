"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Trade/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var SettlementStatus;
(function (SettlementStatus) {
    SettlementStatus["SettlementStatus_Pending"] = "SettlementStatus_Pending";
    SettlementStatus["SettlementStatus_Instructed"] = "SettlementStatus_Instructed";
    SettlementStatus["SettlementStatus_Settled"] = "SettlementStatus_Settled";
})(SettlementStatus = exports.SettlementStatus || (exports.SettlementStatus = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(SettlementStatus);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (SettlementStatus) {
    SettlementStatus.decoder = function () { return jtv.oneOf(jtv.constant(SettlementStatus.SettlementStatus_Pending), jtv.constant(SettlementStatus.SettlementStatus_Instructed), jtv.constant(SettlementStatus.SettlementStatus_Settled)); };
})(SettlementStatus = exports.SettlementStatus || (exports.SettlementStatus = {}));
//# sourceMappingURL=Types.js.map