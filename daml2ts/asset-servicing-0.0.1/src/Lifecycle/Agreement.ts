// Generated from Lifecycle/Agreement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Lifecycle_Position from '..//Lifecycle/Position';
import * as Types from '..//Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Decline = {
}
export const Decline: daml.Serializable<Decline> = ({
  decoder: () => jtv.object({
  }),
})

export type LifecycleAgreement_Accept = {
}
export const LifecycleAgreement_Accept: daml.Serializable<LifecycleAgreement_Accept> = ({
  decoder: () => jtv.object({
  }),
})

export type LifecycleAgreementRequest = {
  instrumentHost: daml.Party;
  positionHost: daml.Party;
}
export const LifecycleAgreementRequest: daml.Template<LifecycleAgreementRequest, undefined, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreementRequest'> & {
  LifecycleAgreement_Accept: daml.Choice<LifecycleAgreementRequest, LifecycleAgreement_Accept, daml.ContractId<LifecycleAgreement>, undefined>;
  Archive: daml.Choice<LifecycleAgreementRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, undefined>;
  Decline: daml.Choice<LifecycleAgreementRequest, Decline, {}, undefined>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreementRequest',
  keyDecoder: () => jtv.constant(undefined),
  decoder: () => jtv.object({
    instrumentHost: daml.Party.decoder(),
    positionHost: daml.Party.decoder(),
  }),
  LifecycleAgreement_Accept: {
    template: () => LifecycleAgreementRequest,
    choiceName: 'LifecycleAgreement_Accept',
    argumentDecoder: LifecycleAgreement_Accept.decoder,
    resultDecoder: () => daml.ContractId(LifecycleAgreement).decoder(),
  },
  Archive: {
    template: () => LifecycleAgreementRequest,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  Decline: {
    template: () => LifecycleAgreementRequest,
    choiceName: 'Decline',
    argumentDecoder: Decline.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
daml.registerTemplate(LifecycleAgreementRequest);

export type LifecyclePosition_Create = {
  instrumentId: Types.Id;
  outcome: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<Types.Id, daml.Numeric>[];
}
export const LifecyclePosition_Create: daml.Serializable<LifecyclePosition_Create> = ({
  decoder: () => jtv.object({
    instrumentId: Types.Id.decoder(),
    outcome: daml.List(pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(Types.Id, daml.Numeric(10))).decoder(),
  }),
})

export type LifecycleAgreement = {
  instrumentHost: daml.Party;
  positionHost: daml.Party;
}
export const LifecycleAgreement: daml.Template<LifecycleAgreement, LifecycleAgreement.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreement'> & {
  LifecyclePosition_Create: daml.Choice<LifecycleAgreement, LifecyclePosition_Create, daml.ContractId<Lifecycle_Position.LifecyclePosition>, LifecycleAgreement.Key>;
  Archive: daml.Choice<LifecycleAgreement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, LifecycleAgreement.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreement',
  keyDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.Party, daml.Party).decoder(),
  decoder: () => jtv.object({
    instrumentHost: daml.Party.decoder(),
    positionHost: daml.Party.decoder(),
  }),
  LifecyclePosition_Create: {
    template: () => LifecycleAgreement,
    choiceName: 'LifecyclePosition_Create',
    argumentDecoder: LifecyclePosition_Create.decoder,
    resultDecoder: () => daml.ContractId(Lifecycle_Position.LifecyclePosition).decoder(),
  },
  Archive: {
    template: () => LifecycleAgreement,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LifecycleAgreement {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.Party, daml.Party>
}
daml.registerTemplate(LifecycleAgreement);
