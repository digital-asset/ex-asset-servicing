"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Instrument/FixedIncome/Bond/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Asset_Lifecycle = require("../../../../..//DA/Finance/Asset/Lifecycle");
var DA_Finance_Instrument_FixedIncome_Bond = require("../../../../..//DA/Finance/Instrument/FixedIncome/Bond");
var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types = require("@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types");
var pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set = require("@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set");
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template = require("@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template");
exports.BondCoupon_Lifecycle = ({
    decoder: function () { return jtv.object({
        bondCid: daml.ContractId(DA_Finance_Instrument_FixedIncome_Bond.Bond).decoder(),
    }); },
});
exports.BondCouponRule = {
    templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.FixedIncome.Bond.Lifecycle:BondCouponRule',
    keyDecoder: function () { return pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(); },
    decoder: function () { return jtv.object({
        signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    }); },
    Archive: {
        template: function () { return exports.BondCouponRule; },
        choiceName: 'Archive',
        argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
        resultDecoder: function () { return daml.Unit.decoder(); },
    },
    BondCoupon_Lifecycle: {
        template: function () { return exports.BondCouponRule; },
        choiceName: 'BondCoupon_Lifecycle',
        argumentDecoder: exports.BondCoupon_Lifecycle.decoder,
        resultDecoder: function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.ContractId(DA_Finance_Instrument_FixedIncome_Bond.Bond), daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects)).decoder(); },
    },
};
daml.registerTemplate(exports.BondCouponRule);
//# sourceMappingURL=Lifecycle.js.map