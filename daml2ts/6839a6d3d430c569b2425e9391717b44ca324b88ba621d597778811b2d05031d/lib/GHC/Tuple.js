"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from GHC/Tuple.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
exports.Unit = function (a) { return ({
    decoder: function () { return jtv.object({
        _1: a.decoder(),
    }); },
}); };
//# sourceMappingURL=Tuple.js.map