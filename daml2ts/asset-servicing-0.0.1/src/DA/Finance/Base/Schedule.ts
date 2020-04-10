// Generated from DA/Finance/Base/Schedule.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Base_HolidayCalendar from '../../..//DA/Finance/Base/HolidayCalendar';
import * as DA_Finance_Base_RollConvention from '../../..//DA/Finance/Base/RollConvention';

export type SchedulePeriod = {
  adjustedEndDate: daml.Date;
  adjustedStartDate: daml.Date;
  unadjustedEndDate: daml.Date;
  unadjustedStartDate: daml.Date;
}
export const SchedulePeriod: daml.Serializable<SchedulePeriod> = ({
  decoder: () => jtv.object({
    adjustedEndDate: daml.Date.decoder(),
    adjustedStartDate: daml.Date.decoder(),
    unadjustedEndDate: daml.Date.decoder(),
    unadjustedStartDate: daml.Date.decoder(),
  }),
})

export type PeriodicSchedule = {
  effectiveDate: daml.Date;
  terminationDate: daml.Date;
  firstRegularPeriodStartDate: daml.Optional<daml.Date>;
  lastRegularPeriodEndDate: daml.Optional<daml.Date>;
  frequency: Frequency;
  businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment;
  effectiveDateBusinessDayAdjustment: daml.Optional<DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment>;
  terminationDateBusinessDayAdjustment: daml.Optional<DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment>;
  stubPeriodType: daml.Optional<StubPeriodTypeEnum>;
}
export const PeriodicSchedule: daml.Serializable<PeriodicSchedule> = ({
  decoder: () => jtv.object({
    effectiveDate: daml.Date.decoder(),
    terminationDate: daml.Date.decoder(),
    firstRegularPeriodStartDate: daml.Optional(daml.Date).decoder(),
    lastRegularPeriodEndDate: daml.Optional(daml.Date).decoder(),
    frequency: Frequency.decoder(),
    businessDayAdjustment: DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment.decoder(),
    effectiveDateBusinessDayAdjustment: daml.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).decoder(),
    terminationDateBusinessDayAdjustment: daml.Optional(DA_Finance_Base_HolidayCalendar.BusinessDayAdjustment).decoder(),
    stubPeriodType: daml.Optional(StubPeriodTypeEnum).decoder(),
  }),
})

export type Frequency = {
  period: DA_Finance_Base_RollConvention.PeriodEnum;
  periodMultiplier: daml.Int;
  rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum;
}
export const Frequency: daml.Serializable<Frequency> = ({
  decoder: () => jtv.object({
    period: DA_Finance_Base_RollConvention.PeriodEnum.decoder(),
    periodMultiplier: daml.Int.decoder(),
    rollConvention: DA_Finance_Base_RollConvention.RollConventionEnum.decoder(),
  }),
})

export enum StubPeriodTypeEnum {
  LONG_FINAL = 'LONG_FINAL',
  LONG_INITIAL = 'LONG_INITIAL',
  SHORT_FINAL = 'SHORT_FINAL',
  SHORT_INITIAL = 'SHORT_INITIAL',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<StubPeriodTypeEnum>(StubPeriodTypeEnum)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StubPeriodTypeEnum {
  export const decoder = () => jtv.oneOf<StubPeriodTypeEnum>(
    jtv.constant(StubPeriodTypeEnum.LONG_FINAL),
    jtv.constant(StubPeriodTypeEnum.LONG_INITIAL),
    jtv.constant(StubPeriodTypeEnum.SHORT_FINAL),
    jtv.constant(StubPeriodTypeEnum.SHORT_INITIAL),
  );
}
