// Generated from RefData/EqStock.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type EqStock = {
  instrumentId: Types.Id;
  ccy: Types.Id;
  obs: daml.Party[];
}
export const EqStock: daml.Template<EqStock, EqStock.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqStock:EqStock'> & {
  Archive: daml.Choice<EqStock, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EqStock.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqStock:EqStock',
  keyDecoder: () => Types.Id.decoder(),
  decoder: () => jtv.object({
    instrumentId: Types.Id.decoder(),
    ccy: Types.Id.decoder(),
    obs: daml.List(daml.Party).decoder(),
  }),
  Archive: {
    template: () => EqStock,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EqStock {
  export type Key = Types.Id
}
daml.registerTemplate(EqStock);
