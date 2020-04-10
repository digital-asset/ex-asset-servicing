import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';
import * as DA_Finance_Base_HolidayCalendar from '../../..//DA/Finance/Base/HolidayCalendar';
import * as DA_Finance_Base_RollConvention from '../../..//DA/Finance/Base/RollConvention';
export declare type SchedulePeriod = {
    adjustedEndDate: daml.Date;
    adjustedStartDate: daml.Date;
    unadjustedEndDate: daml.Date;
    unadjustedStartDate: daml.Date;
};
export declare const SchedulePeriod: daml.Serializable<SchedulePeriod>;
export declare type PeriodicSchedule = {
    effectiveDate: daml.Date;
    terminationDate: daml.Date;
    firstRegularPeriodStartDate: daml.Optional<daml.Date>;
    lastRegularPeriodEndDate: daml.Optional<daml.Date>;
    frequency: Frequency;
    businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment;
    effectiveDateBusinessDayAdjustment: daml.Optional<DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment>;
    terminationDateBusinessDayAdjustment: daml.Optional<DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment>;
    stubPeriodType: daml.Optional<StubPeriodTypeEnum>;
};
export declare const PeriodicSchedule: daml.Serializable<PeriodicSchedule>;
export declare type Frequency = {
    period: DA_Finance_Base_RollConvention.PeriodEnum;
    periodMultiplier: daml.Int;
    rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum;
};
export declare const Frequency: daml.Serializable<Frequency>;
export declare enum StubPeriodTypeEnum {
    LONG_FINAL = "LONG_FINAL",
    LONG_INITIAL = "LONG_INITIAL",
    SHORT_FINAL = "SHORT_FINAL",
    SHORT_INITIAL = "SHORT_INITIAL"
}
export declare namespace StubPeriodTypeEnum {
    const decoder: () => jtv.Decoder<StubPeriodTypeEnum>;
}
