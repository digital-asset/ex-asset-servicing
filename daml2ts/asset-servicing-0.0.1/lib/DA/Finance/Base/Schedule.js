"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Base/Schedule.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DA_Finance_Base_HolidayCalendar = require("../../..//DA/Finance/Base/HolidayCalendar");
var DA_Finance_Base_RollConvention = require("../../..//DA/Finance/Base/RollConvention");
exports.SchedulePeriod = ({
    decoder: function () { return jtv.object({
        adjustedEndDate: daml.Date.decoder(),
        adjustedStartDate: daml.Date.decoder(),
        unadjustedEndDate: daml.Date.decoder(),
        unadjustedStartDate: daml.Date.decoder(),
    }); },
});
exports.PeriodicSchedule = ({
    decoder: function () { return jtv.object({
        effectiveDate: daml.Date.decoder(),
        terminationDate: daml.Date.decoder(),
        firstRegularPeriodStartDate: daml.Optional(daml.Date).decoder(),
        lastRegularPeriodEndDate: daml.Optional(daml.Date).decoder(),
        frequency: exports.Frequency.decoder(),
        businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment.decoder(),
        effectiveDateBusinessDayAdjustment: daml.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).decoder(),
        terminationDateBusinessDayAdjustment: daml.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).decoder(),
        stubPeriodType: daml.Optional(StubPeriodTypeEnum).decoder(),
    }); },
});
exports.Frequency = ({
    decoder: function () { return jtv.object({
        period: DA_Finance_Base_RollConvention.PeriodEnum.decoder(),
        periodMultiplier: daml.Int.decoder(),
        rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum.decoder(),
    }); },
});
var StubPeriodTypeEnum;
(function (StubPeriodTypeEnum) {
    StubPeriodTypeEnum["LONG_FINAL"] = "LONG_FINAL";
    StubPeriodTypeEnum["LONG_INITIAL"] = "LONG_INITIAL";
    StubPeriodTypeEnum["SHORT_FINAL"] = "SHORT_FINAL";
    StubPeriodTypeEnum["SHORT_INITIAL"] = "SHORT_INITIAL";
})(StubPeriodTypeEnum = exports.StubPeriodTypeEnum || (exports.StubPeriodTypeEnum = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(StubPeriodTypeEnum);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (StubPeriodTypeEnum) {
    StubPeriodTypeEnum.decoder = function () { return jtv.oneOf(jtv.constant(StubPeriodTypeEnum.LONG_FINAL), jtv.constant(StubPeriodTypeEnum.LONG_INITIAL), jtv.constant(StubPeriodTypeEnum.SHORT_FINAL), jtv.constant(StubPeriodTypeEnum.SHORT_INITIAL)); };
})(StubPeriodTypeEnum = exports.StubPeriodTypeEnum || (exports.StubPeriodTypeEnum = {}));
//# sourceMappingURL=Schedule.js.map