"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Test.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var Types = require(".//Types");
exports.InstrumentSetup = ({
    decoder: function () { return jtv.object({
        chf: Types.Id.decoder(),
        csgn: Types.Id.decoder(),
        ubsg: Types.Id.decoder(),
        csgnCall: Types.Id.decoder(),
        acbrc: Types.Id.decoder(),
    }); },
});
exports.PartySetup = ({
    decoder: function () { return jtv.object({
        pb: daml.Party.decoder(),
        csd: daml.Party.decoder(),
        ib: daml.Party.decoder(),
    }); },
});
//# sourceMappingURL=Test.js.map