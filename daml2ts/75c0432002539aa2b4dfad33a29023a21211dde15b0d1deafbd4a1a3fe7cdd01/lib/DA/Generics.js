"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Generics.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DecidedStrictness;
(function (DecidedStrictness) {
    DecidedStrictness["DecidedLazy"] = "DecidedLazy";
    DecidedStrictness["DecidedStrict"] = "DecidedStrict";
    DecidedStrictness["DecidedUnpack"] = "DecidedUnpack";
})(DecidedStrictness = exports.DecidedStrictness || (exports.DecidedStrictness = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(DecidedStrictness);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (DecidedStrictness) {
    DecidedStrictness.decoder = function () { return jtv.oneOf(jtv.constant(DecidedStrictness.DecidedLazy), jtv.constant(DecidedStrictness.DecidedStrict), jtv.constant(DecidedStrictness.DecidedUnpack)); };
})(DecidedStrictness = exports.DecidedStrictness || (exports.DecidedStrictness = {}));
var SourceStrictness;
(function (SourceStrictness) {
    SourceStrictness["NoSourceStrictness"] = "NoSourceStrictness";
    SourceStrictness["SourceLazy"] = "SourceLazy";
    SourceStrictness["SourceStrict"] = "SourceStrict";
})(SourceStrictness = exports.SourceStrictness || (exports.SourceStrictness = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(SourceStrictness);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (SourceStrictness) {
    SourceStrictness.decoder = function () { return jtv.oneOf(jtv.constant(SourceStrictness.NoSourceStrictness), jtv.constant(SourceStrictness.SourceLazy), jtv.constant(SourceStrictness.SourceStrict)); };
})(SourceStrictness = exports.SourceStrictness || (exports.SourceStrictness = {}));
var SourceUnpackedness;
(function (SourceUnpackedness) {
    SourceUnpackedness["NoSourceUnpackedness"] = "NoSourceUnpackedness";
    SourceUnpackedness["SourceNoUnpack"] = "SourceNoUnpack";
    SourceUnpackedness["SourceUnpack"] = "SourceUnpack";
})(SourceUnpackedness = exports.SourceUnpackedness || (exports.SourceUnpackedness = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(SourceUnpackedness);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (SourceUnpackedness) {
    SourceUnpackedness.decoder = function () { return jtv.oneOf(jtv.constant(SourceUnpackedness.NoSourceUnpackedness), jtv.constant(SourceUnpackedness.SourceNoUnpack), jtv.constant(SourceUnpackedness.SourceUnpack)); };
})(SourceUnpackedness = exports.SourceUnpackedness || (exports.SourceUnpackedness = {}));
var Associativity;
(function (Associativity) {
    Associativity["LeftAssociative"] = "LeftAssociative";
    Associativity["RightAssociative"] = "RightAssociative";
    Associativity["NotAssociative"] = "NotAssociative";
})(Associativity = exports.Associativity || (exports.Associativity = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(Associativity);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (Associativity) {
    Associativity.decoder = function () { return jtv.oneOf(jtv.constant(Associativity.LeftAssociative), jtv.constant(Associativity.RightAssociative), jtv.constant(Associativity.NotAssociative)); };
})(Associativity = exports.Associativity || (exports.Associativity = {}));
exports.Infix0 = ({
    decoder: function () { return jtv.object({
        associativity: Associativity.decoder(),
        fixity: daml.Int.decoder(),
    }); },
});
exports.Fixity = ({
    decoder: function () { return jtv.oneOf(jtv.object({ tag: jtv.constant('Prefix'), value: jtv.lazy(function () { return daml.Unit.decoder(); }) }), jtv.object({ tag: jtv.constant('Infix'), value: jtv.lazy(function () { return exports.Infix0.decoder(); }) })); },
});
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(exports.Fixity);
exports.K1 = function (i_a2Fq, c_a2Fr, p_a2Fs) { return ({
    decoder: function () { return jtv.object({
        unK1: c_a2Fr.decoder(),
    }); },
}); };
exports.Par1 = function (p_a2Fv) { return ({
    decoder: function () { return jtv.object({
        unPar1: p_a2Fv.decoder(),
    }); },
}); };
exports.U1 = function (p_a2Fw) { return ({
    decoder: function () { return jtv.object({}); },
}); };
//# sourceMappingURL=Generics.js.map