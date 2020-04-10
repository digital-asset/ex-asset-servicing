"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from Init.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Types = require(".//DA/Finance/Types");
exports.Accounts = ({
    decoder: function () { return jtv.object({
        jpmSnbAccount: DA_Finance_Types.Account.decoder(),
        jpmSixAccount: DA_Finance_Types.Account.decoder(),
        jpmEurexAccount: DA_Finance_Types.Account.decoder(),
    }); },
});
exports.Assets = ({
    decoder: function () { return jtv.object({
        usd: DA_Finance_Types.Asset.decoder(),
        eur: DA_Finance_Types.Asset.decoder(),
        chf: DA_Finance_Types.Asset.decoder(),
        csgn: DA_Finance_Types.Asset.decoder(),
        ubsg: DA_Finance_Types.Asset.decoder(),
        csgnCall: DA_Finance_Types.Asset.decoder(),
        ubsgPut: DA_Finance_Types.Asset.decoder(),
    }); },
});
exports.Parties = ({
    decoder: function () { return jtv.object({
        fed: daml.Party.decoder(),
        ecb: daml.Party.decoder(),
        snb: daml.Party.decoder(),
        eurex: daml.Party.decoder(),
        six: daml.Party.decoder(),
        jpm: daml.Party.decoder(),
    }); },
});
//# sourceMappingURL=Init.js.map