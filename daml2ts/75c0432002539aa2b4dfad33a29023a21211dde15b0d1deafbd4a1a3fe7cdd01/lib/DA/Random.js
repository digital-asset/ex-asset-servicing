"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Random.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.Minstd = ({
    decoder: function () { return jtv.oneOf(jtv.object({ tag: jtv.constant('Minstd'), value: jtv.lazy(function () { return daml.Int.decoder(); }) })); },
});
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(exports.Minstd);
//# sourceMappingURL=Random.js.map