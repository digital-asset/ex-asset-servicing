// Generated from RefData/EqACBRC.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type EqACBRC = {
  instrumentId: Types.Id;
  ccy: Types.Id;
  notional: daml.Numeric;
  barrier: daml.Numeric;
  barrierIsHit: boolean;
  fixingDates: daml.Date[];
  fixingIdx: daml.Int;
  coupon: daml.Numeric;
  underlying: Types.Id;
  initialFixing: daml.Numeric;
  obs: daml.Party[];
}
export const EqACBRC: daml.Template<EqACBRC, EqACBRC.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqACBRC:EqACBRC'> & {
  Archive: daml.Choice<EqACBRC, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EqACBRC.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqACBRC:EqACBRC',
  keyDecoder: () => Types.Id.decoder(),
  decoder: () => jtv.object({
    instrumentId: Types.Id.decoder(),
    ccy: Types.Id.decoder(),
    notional: daml.Numeric(10).decoder(),
    barrier: daml.Numeric(10).decoder(),
    barrierIsHit: daml.Bool.decoder(),
    fixingDates: daml.List(daml.Date).decoder(),
    fixingIdx: daml.Int.decoder(),
    coupon: daml.Numeric(10).decoder(),
    underlying: Types.Id.decoder(),
    initialFixing: daml.Numeric(10).decoder(),
    obs: daml.List(daml.Party).decoder(),
  }),
  Archive: {
    template: () => EqACBRC,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EqACBRC {
  export type Key = Types.Id
}
daml.registerTemplate(EqACBRC);
