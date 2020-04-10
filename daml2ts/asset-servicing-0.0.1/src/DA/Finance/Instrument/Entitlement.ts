// Generated from DA/Finance/Instrument/Entitlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset_Lifecycle from '../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Entitlement_Lifecycle = {
}
export const Entitlement_Lifecycle: daml.Serializable<Entitlement_Lifecycle> = ({
  decoder: () => jtv.object({
  }),
})

export type Entitlement_SetObservers = {
  newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const Entitlement_SetObservers: daml.Serializable<Entitlement_SetObservers> = ({
  decoder: () => jtv.object({
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
})

export type Entitlement = {
  id: DA_Finance_Types.Id;
  settlementDate: daml.Date;
  underlying: DA_Finance_Types.Asset;
  payment: daml.Optional<DA_Finance_Types.Asset>;
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const Entitlement: daml.Template<Entitlement, Entitlement.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Entitlement:Entitlement'> & {
  Entitlement_SetObservers: daml.Choice<Entitlement, Entitlement_SetObservers, daml.ContractId<Entitlement>, Entitlement.Key>;
  Archive: daml.Choice<Entitlement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, Entitlement.Key>;
  Entitlement_Lifecycle: daml.Choice<Entitlement, Entitlement_Lifecycle, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>, Entitlement.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Entitlement:Entitlement',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    id: DA_Finance_Types.Id.decoder(),
    settlementDate: daml.Date.decoder(),
    underlying: DA_Finance_Types.Asset.decoder(),
    payment: daml.Optional(DA_Finance_Types.Asset).decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Entitlement_SetObservers: {
    template: () => Entitlement,
    choiceName: 'Entitlement_SetObservers',
    argumentDecoder: Entitlement_SetObservers.decoder,
    resultDecoder: () => daml.ContractId(Entitlement).decoder(),
  },
  Archive: {
    template: () => Entitlement,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  Entitlement_Lifecycle: {
    template: () => Entitlement,
    choiceName: 'Entitlement_Lifecycle',
    argumentDecoder: Entitlement_Lifecycle.decoder,
    resultDecoder: () => daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Entitlement {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(Entitlement);
