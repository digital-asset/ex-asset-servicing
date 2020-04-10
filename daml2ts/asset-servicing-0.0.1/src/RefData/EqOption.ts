// Generated from RefData/EqOption.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type EqOption = {
  instrumentId: Types.Id;
  underlying: Types.Id;
  optionType: OptionType;
  strike: daml.Numeric;
  contractSize: daml.Numeric;
  maturity: daml.Date;
  obs: daml.Party[];
}
export const EqOption: daml.Template<EqOption, EqOption.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqOption:EqOption'> & {
  Archive: daml.Choice<EqOption, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EqOption.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqOption:EqOption',
  keyDecoder: () => Types.Id.decoder(),
  decoder: () => jtv.object({
    instrumentId: Types.Id.decoder(),
    underlying: Types.Id.decoder(),
    optionType: OptionType.decoder(),
    strike: daml.Numeric(10).decoder(),
    contractSize: daml.Numeric(10).decoder(),
    maturity: daml.Date.decoder(),
    obs: daml.List(daml.Party).decoder(),
  }),
  Archive: {
    template: () => EqOption,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EqOption {
  export type Key = Types.Id
}
daml.registerTemplate(EqOption);

export enum OptionType {
  Put = 'Put',
  Call = 'Call',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<OptionType>(OptionType)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OptionType {
  export const decoder = () => jtv.oneOf<OptionType>(
    jtv.constant(OptionType.Put),
    jtv.constant(OptionType.Call),
  );
}
