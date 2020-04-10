// Generated from DA/Finance/Instrument/Equity/ACBRC.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type ACBRC = {
  id: DA_Finance_Types.Id;
  underlyingId: DA_Finance_Types.Id;
  currencyId: DA_Finance_Types.Id;
  knockInBarrier: daml.Numeric;
  knockInBarrierHit: boolean;
  callBarrier: daml.Numeric;
  callBarrierHit: boolean;
  fixingDates: daml.Date[];
  fixingIdx: daml.Int;
  coupon: daml.Numeric;
  initialFixing: daml.Numeric;
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const ACBRC: daml.Template<ACBRC, ACBRC.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.ACBRC:ACBRC'> & {
  Archive: daml.Choice<ACBRC, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, ACBRC.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.ACBRC:ACBRC',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    id: DA_Finance_Types.Id.decoder(),
    underlyingId: DA_Finance_Types.Id.decoder(),
    currencyId: DA_Finance_Types.Id.decoder(),
    knockInBarrier: daml.Numeric(10).decoder(),
    knockInBarrierHit: daml.Bool.decoder(),
    callBarrier: daml.Numeric(10).decoder(),
    callBarrierHit: daml.Bool.decoder(),
    fixingDates: daml.List(daml.Date).decoder(),
    fixingIdx: daml.Int.decoder(),
    coupon: daml.Numeric(10).decoder(),
    initialFixing: daml.Numeric(10).decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => ACBRC,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ACBRC {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(ACBRC);
