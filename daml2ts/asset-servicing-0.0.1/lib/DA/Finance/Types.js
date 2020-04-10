"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
exports.MasterAgreement = ({
    decoder: function () { return jtv.object({
        id: exports.Id.decoder(),
        party1: daml.Party.decoder(),
        party2: daml.Party.decoder(),
    }); },
});
exports.Asset = ({
    decoder: function () { return jtv.object({
        id: exports.Id.decoder(),
        quantity: daml.Numeric(10).decoder(),
    }); },
});
exports.Account = ({
    decoder: function () { return jtv.object({
        id: exports.Id.decoder(),
        provider: daml.Party.decoder(),
        owner: daml.Party.decoder(),
    }); },
});
exports.Id = ({
    decoder: function () { return jtv.object({
        signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
        label: daml.Text.decoder(),
        version: daml.Int.decoder(),
    }); },
});
//# sourceMappingURL=Types.js.map