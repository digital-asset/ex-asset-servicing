"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Logic/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
exports.Formula = function (a) { return ({
    decoder: function () { return jtv.oneOf(jtv.object({ tag: jtv.constant('Proposition'), value: jtv.lazy(function () { return a.decoder(); }) }), jtv.object({ tag: jtv.constant('Negation'), value: jtv.lazy(function () { return exports.Formula(a).decoder(); }) }), jtv.object({ tag: jtv.constant('Conjunction'), value: jtv.lazy(function () { return daml.List(exports.Formula(a)).decoder(); }) }), jtv.object({ tag: jtv.constant('Disjunction'), value: jtv.lazy(function () { return daml.List(exports.Formula(a)).decoder(); }) })); },
}); };
//# sourceMappingURL=Types.js.map