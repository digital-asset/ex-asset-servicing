"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Finance/Base/HolidayCalendar.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types = require("@daml2ts/bfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f/lib/DA/Date/Types");
exports.BusinessDayAdjustment = ({
    decoder: function () { return jtv.object({
        calendarIds: daml.List(daml.Text).decoder(),
        convention: BusinessDayConventionEnum.decoder(),
    }); },
});
var BusinessDayConventionEnum;
(function (BusinessDayConventionEnum) {
    BusinessDayConventionEnum["FOLLOWING"] = "FOLLOWING";
    BusinessDayConventionEnum["MODFOLLOWING"] = "MODFOLLOWING";
    BusinessDayConventionEnum["MODPRECEDING"] = "MODPRECEDING";
    BusinessDayConventionEnum["NONE"] = "NONE";
    BusinessDayConventionEnum["PRECEDING"] = "PRECEDING";
})(BusinessDayConventionEnum = exports.BusinessDayConventionEnum || (exports.BusinessDayConventionEnum = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(BusinessDayConventionEnum);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (BusinessDayConventionEnum) {
    BusinessDayConventionEnum.decoder = function () { return jtv.oneOf(jtv.constant(BusinessDayConventionEnum.FOLLOWING), jtv.constant(BusinessDayConventionEnum.MODFOLLOWING), jtv.constant(BusinessDayConventionEnum.MODPRECEDING), jtv.constant(BusinessDayConventionEnum.NONE), jtv.constant(BusinessDayConventionEnum.PRECEDING)); };
})(BusinessDayConventionEnum = exports.BusinessDayConventionEnum || (exports.BusinessDayConventionEnum = {}));
exports.HolidayCalendarData = ({
    decoder: function () { return jtv.object({
        id: daml.Text.decoder(),
        weekend: daml.List(pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types.DayOfWeek).decoder(),
        holidays: daml.List(daml.Date).decoder(),
    }); },
});
//# sourceMappingURL=HolidayCalendar.js.map