"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Daml/Script.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.LedgerValue = ({
    decoder: function () { return jtv.object({}); },
});
exports.SubmitFailure = ({
    decoder: function () { return jtv.object({
        status: daml.Int.decoder(),
        description: daml.Text.decoder(),
    }); },
});
exports.ParticipantName = ({
    decoder: function () { return jtv.object({
        participantName: daml.Text.decoder(),
    }); },
});
exports.PartyIdHint = ({
    decoder: function () { return jtv.object({
        partyIdHint: daml.Text.decoder(),
    }); },
});
//# sourceMappingURL=Script.js.map