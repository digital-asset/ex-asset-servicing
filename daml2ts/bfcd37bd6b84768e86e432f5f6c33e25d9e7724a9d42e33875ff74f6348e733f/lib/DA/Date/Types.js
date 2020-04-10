"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generated from DA/Date/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
var jtv = require("@mojotech/json-type-validation");
var daml = require("@daml/types");
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Monday"] = "Monday";
    DayOfWeek["Tuesday"] = "Tuesday";
    DayOfWeek["Wednesday"] = "Wednesday";
    DayOfWeek["Thursday"] = "Thursday";
    DayOfWeek["Friday"] = "Friday";
    DayOfWeek["Saturday"] = "Saturday";
    DayOfWeek["Sunday"] = "Sunday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(DayOfWeek);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (DayOfWeek) {
    DayOfWeek.decoder = function () { return jtv.oneOf(jtv.constant(DayOfWeek.Monday), jtv.constant(DayOfWeek.Tuesday), jtv.constant(DayOfWeek.Wednesday), jtv.constant(DayOfWeek.Thursday), jtv.constant(DayOfWeek.Friday), jtv.constant(DayOfWeek.Saturday), jtv.constant(DayOfWeek.Sunday)); };
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
var Month;
(function (Month) {
    Month["Jan"] = "Jan";
    Month["Feb"] = "Feb";
    Month["Mar"] = "Mar";
    Month["Apr"] = "Apr";
    Month["May"] = "May";
    Month["Jun"] = "Jun";
    Month["Jul"] = "Jul";
    Month["Aug"] = "Aug";
    Month["Sep"] = "Sep";
    Month["Oct"] = "Oct";
    Month["Nov"] = "Nov";
    Month["Dec"] = "Dec";
})(Month = exports.Month || (exports.Month = {}));
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK(Month);
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (Month) {
    Month.decoder = function () { return jtv.oneOf(jtv.constant(Month.Jan), jtv.constant(Month.Feb), jtv.constant(Month.Mar), jtv.constant(Month.Apr), jtv.constant(Month.May), jtv.constant(Month.Jun), jtv.constant(Month.Jul), jtv.constant(Month.Aug), jtv.constant(Month.Sep), jtv.constant(Month.Oct), jtv.constant(Month.Nov), jtv.constant(Month.Dec)); };
})(Month = exports.Month || (exports.Month = {}));
//# sourceMappingURL=Types.js.map