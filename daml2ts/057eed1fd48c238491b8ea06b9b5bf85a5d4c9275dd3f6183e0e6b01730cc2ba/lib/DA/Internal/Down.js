"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Internal/Down.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
exports.Down = function (a) { return ({
    decoder: function () { return jtv.object({
        unpack: a.decoder(),
    }); },
}); };
//# sourceMappingURL=Down.js.map