// Generated from DA/Finance/Base/HolidayCalendar.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types from '@daml2ts/bfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f/lib/DA/Date/Types';

export type BusinessDayAdjustment = {
  calendarIds: string[];
  convention: BusinessDayConventionEnum;
}
export const BusinessDayAdjustment: daml.Serializable<BusinessDayAdjustment> = ({
  decoder: () => jtv.object({
    calendarIds: daml.List(daml.Text).decoder(),
    convention: BusinessDayConventionEnum.decoder(),
  }),
})

export enum BusinessDayConventionEnum {
  FOLLOWING = 'FOLLOWING',
  MODFOLLOWING = 'MODFOLLOWING',
  MODPRECEDING = 'MODPRECEDING',
  NONE = 'NONE',
  PRECEDING = 'PRECEDING',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<BusinessDayConventionEnum>(BusinessDayConventionEnum)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BusinessDayConventionEnum {
  export const decoder = () => jtv.oneOf<BusinessDayConventionEnum>(
    jtv.constant(BusinessDayConventionEnum.FOLLOWING),
    jtv.constant(BusinessDayConventionEnum.MODFOLLOWING),
    jtv.constant(BusinessDayConventionEnum.MODPRECEDING),
    jtv.constant(BusinessDayConventionEnum.NONE),
    jtv.constant(BusinessDayConventionEnum.PRECEDING),
  );
}

export type HolidayCalendarData = {
  id: string;
  weekend: pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types.DayOfWeek[];
  holidays: daml.Date[];
}
export const HolidayCalendarData: daml.Serializable<HolidayCalendarData> = ({
  decoder: () => jtv.object({
    id: daml.Text.decoder(),
    weekend: daml.List(pkgbfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f_DA_Date_Types.DayOfWeek).decoder(),
    holidays: daml.List(daml.Date).decoder(),
  }),
})
