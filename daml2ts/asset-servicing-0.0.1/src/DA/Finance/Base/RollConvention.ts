// Generated from DA/Finance/Base/RollConvention.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export type RollConventionEnum = 
  |  { tag: 'EOM'; value: {} }
  |  { tag: 'DOM'; value: daml.Int }
export const RollConventionEnum:
  daml.Serializable<RollConventionEnum> & {
  } = ({
  decoder: () => jtv.oneOf<RollConventionEnum>(
    jtv.object({tag: jtv.constant('EOM'), value: jtv.lazy(() => daml.Unit.decoder())}),
    jtv.object({tag: jtv.constant('DOM'), value: jtv.lazy(() => daml.Int.decoder())}),
  ),
});
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<RollConventionEnum>(RollConventionEnum)

export enum PeriodEnum {
  D = 'D',
  M = 'M',
  W = 'W',
  Y = 'Y',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<PeriodEnum>(PeriodEnum)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PeriodEnum {
  export const decoder = () => jtv.oneOf<PeriodEnum>(
    jtv.constant(PeriodEnum.D),
    jtv.constant(PeriodEnum.M),
    jtv.constant(PeriodEnum.W),
    jtv.constant(PeriodEnum.Y),
  );
}

export type Period = {
  period: PeriodEnum;
  periodMultiplier: daml.Int;
}
export const Period: daml.Serializable<Period> = ({
  decoder: () => jtv.object({
    period: PeriodEnum.decoder(),
    periodMultiplier: daml.Int.decoder(),
  }),
})
