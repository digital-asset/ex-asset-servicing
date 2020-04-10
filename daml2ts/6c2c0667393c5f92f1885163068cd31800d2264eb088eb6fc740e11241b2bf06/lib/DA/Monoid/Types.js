"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Monoid/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.All = ({
    decoder: function () { return jtv.object({
        getAll: daml.Bool.decoder(),
    }); },
});
exports.Any = ({
    decoder: function () { return jtv.object({
        getAny: daml.Bool.decoder(),
    }); },
});
exports.Sum = function (a) { return ({
    decoder: function () { return jtv.object({
        unpack: a.decoder(),
    }); },
}); };
exports.Product = function (a) { return ({
    decoder: function () { return jtv.object({
        unpack: a.decoder(),
    }); },
}); };
//# sourceMappingURL=Types.js.map