"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Semigroup/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
exports.Min = function (a) { return ({
    decoder: function () { return jtv.object({
        unpack: a.decoder(),
    }); },
}); };
exports.Max = function (a) { return ({
    decoder: function () { return jtv.object({
        unpack: a.decoder(),
    }); },
}); };
//# sourceMappingURL=Types.js.map