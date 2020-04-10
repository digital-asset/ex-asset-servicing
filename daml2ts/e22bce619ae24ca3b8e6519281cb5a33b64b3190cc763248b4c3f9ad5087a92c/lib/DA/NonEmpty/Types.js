"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/NonEmpty/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.NonEmpty = function (a) { return ({
    decoder: function () { return jtv.object({
        hd: a.decoder(),
        tl: daml.List(a).decoder(),
    }); },
}); };
//# sourceMappingURL=Types.js.map