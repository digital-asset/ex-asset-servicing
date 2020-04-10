"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Next/Set.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.Set = function (a_aabb) { return ({
    decoder: function () { return jtv.object({
        textMap: daml.TextMap(daml.Unit).decoder(),
    }); },
}); };
//# sourceMappingURL=Set.js.map