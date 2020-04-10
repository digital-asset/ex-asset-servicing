// Generated from Lifecycle/Position.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Lifecycle = {
  positionId: Types.PositionId;
}
export const Lifecycle: daml.Serializable<Lifecycle> = ({
  decoder: () => jtv.object({
    positionId: Types.PositionId.decoder(),
  }),
})

export type LifecyclePosition = {
  positionHost: daml.Party;
  instrumentId: Types.Id;
  outcome: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<Types.Id, daml.Numeric>[];
}
export const LifecyclePosition: daml.Template<LifecyclePosition, LifecyclePosition.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Position:LifecyclePosition'> & {
  Archive: daml.Choice<LifecyclePosition, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, LifecyclePosition.Key>;
  Lifecycle: daml.Choice<LifecyclePosition, Lifecycle, {}, LifecyclePosition.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Position:LifecyclePosition',
  keyDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.Party, Types.Id).decoder(),
  decoder: () => jtv.object({
    positionHost: daml.Party.decoder(),
    instrumentId: Types.Id.decoder(),
    outcome: daml.List(pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(Types.Id, daml.Numeric(10))).decoder(),
  }),
  Archive: {
    template: () => LifecyclePosition,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  Lifecycle: {
    template: () => LifecyclePosition,
    choiceName: 'Lifecycle',
    argumentDecoder: Lifecycle.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LifecyclePosition {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.Party, Types.Id>
}
daml.registerTemplate(LifecyclePosition);
