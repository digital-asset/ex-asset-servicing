"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Time/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.RelTime = ({
    decoder: function () { return jtv.object({
        microseconds: daml.Int.decoder(),
    }); },
});
//# sourceMappingURL=Types.js.map