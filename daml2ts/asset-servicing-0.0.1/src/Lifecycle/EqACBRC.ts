// Generated from Lifecycle/EqACBRC.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type InstrumentLifecycle_ObserveNextFixing = {
  instrumentId: Types.Id;
  fixing: daml.Numeric;
}
export const InstrumentLifecycle_ObserveNextFixing: daml.Serializable<InstrumentLifecycle_ObserveNextFixing> = ({
  decoder: () => jtv.object({
    instrumentId: Types.Id.decoder(),
    fixing: daml.Numeric(10).decoder(),
  }),
})

export type InstrumentLifecycle_StockSplit = {
  instrumentId: Types.Id;
  ratio: daml.Numeric;
}
export const InstrumentLifecycle_StockSplit: daml.Serializable<InstrumentLifecycle_StockSplit> = ({
  decoder: () => jtv.object({
    instrumentId: Types.Id.decoder(),
    ratio: daml.Numeric(10).decoder(),
  }),
})

export type InstrumentLifecycle = {
  instrumentHost: daml.Party;
  positionHosts: daml.Party[];
}
export const InstrumentLifecycle: daml.Template<InstrumentLifecycle, InstrumentLifecycle.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.EqACBRC:InstrumentLifecycle'> & {
  InstrumentLifecycle_StockSplit: daml.Choice<InstrumentLifecycle, InstrumentLifecycle_StockSplit, {}, InstrumentLifecycle.Key>;
  Archive: daml.Choice<InstrumentLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, InstrumentLifecycle.Key>;
  InstrumentLifecycle_ObserveNextFixing: daml.Choice<InstrumentLifecycle, InstrumentLifecycle_ObserveNextFixing, {}, InstrumentLifecycle.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.EqACBRC:InstrumentLifecycle',
  keyDecoder: () => daml.Party.decoder(),
  decoder: () => jtv.object({
    instrumentHost: daml.Party.decoder(),
    positionHosts: daml.List(daml.Party).decoder(),
  }),
  InstrumentLifecycle_StockSplit: {
    template: () => InstrumentLifecycle,
    choiceName: 'InstrumentLifecycle_StockSplit',
    argumentDecoder: InstrumentLifecycle_StockSplit.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  Archive: {
    template: () => InstrumentLifecycle,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  InstrumentLifecycle_ObserveNextFixing: {
    template: () => InstrumentLifecycle,
    choiceName: 'InstrumentLifecycle_ObserveNextFixing',
    argumentDecoder: InstrumentLifecycle_ObserveNextFixing.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace InstrumentLifecycle {
  export type Key = daml.Party
}
daml.registerTemplate(InstrumentLifecycle);
