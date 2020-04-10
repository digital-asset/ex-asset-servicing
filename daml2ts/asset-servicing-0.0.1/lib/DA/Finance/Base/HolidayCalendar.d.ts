import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';
import * as pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types from '@daml2ts/bfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f/lib/DA/Date/Types';
export declare type BusinessDayAdjustment = {
    calendarIds: string[];
    convention: BusinessDayConventionEnum;
};
export declare const BusinessDayAdjustment: daml.Serializable<BusinessDayAdjustment>;
export declare enum BusinessDayConventionEnum {
    FOLLOWING = "FOLLOWING",
    MODFOLLOWING = "MODFOLLOWING",
    MODPRECEDING = "MODPRECEDING",
    NONE = "NONE",
    PRECEDING = "PRECEDING"
}
export declare namespace BusinessDayConventionEnum {
    const decoder: () => jtv.Decoder<BusinessDayConventionEnum>;
}
export declare type HolidayCalendarData = {
    id: string;
    weekend: pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types.DayOfWeek[];
    holidays: daml.Date[];
};
export declare const HolidayCalendarData: daml.Serializable<HolidayCalendarData>;
