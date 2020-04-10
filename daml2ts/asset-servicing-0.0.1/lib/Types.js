"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.PositionId = ({
    decoder: function () { return jtv.object({
        host: daml.Party.decoder(),
        instrumentId: exports.Id.decoder(),
        book: daml.Text.decoder(),
        counterParty: daml.Text.decoder(),
    }); },
});
exports.Id = ({
    decoder: function () { return jtv.object({
        host: daml.Party.decoder(),
        label: daml.Text.decoder(),
        version: daml.Int.decoder(),
    }); },
});
//# sourceMappingURL=Types.js.map