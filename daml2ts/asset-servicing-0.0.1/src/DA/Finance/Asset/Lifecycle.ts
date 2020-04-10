// Generated from DA/Finance/Asset/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset from '../../..//DA/Finance/Asset';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type LifecycleEffects_SetObservers = {
  newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const LifecycleEffects_SetObservers: daml.Serializable<LifecycleEffects_SetObservers> = ({
  decoder: () => jtv.object({
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
})

export type LifecycleEffects = {
  id: DA_Finance_Types.Id;
  consuming: DA_Finance_Types.Asset[];
  effects: DA_Finance_Types.Asset[];
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const LifecycleEffects: daml.Template<LifecycleEffects, LifecycleEffects.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:LifecycleEffects'> & {
  Archive: daml.Choice<LifecycleEffects, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, LifecycleEffects.Key>;
  LifecycleEffects_SetObservers: daml.Choice<LifecycleEffects, LifecycleEffects_SetObservers, daml.ContractId<LifecycleEffects>, LifecycleEffects.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:LifecycleEffects',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    id: DA_Finance_Types.Id.decoder(),
    consuming: daml.List(DA_Finance_Types.Asset).decoder(),
    effects: daml.List(DA_Finance_Types.Asset).decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => LifecycleEffects,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  LifecycleEffects_SetObservers: {
    template: () => LifecycleEffects,
    choiceName: 'LifecycleEffects_SetObservers',
    argumentDecoder: LifecycleEffects_SetObservers.decoder,
    resultDecoder: () => daml.ContractId(LifecycleEffects).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LifecycleEffects {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(LifecycleEffects);

export type AssetLifecycle_Process = {
  lifecycleEffectsCid: daml.ContractId<LifecycleEffects>;
  depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
  consumingDepositCids: daml.ContractId<DA_Finance_Asset.AssetDeposit>[];
  accountIds: daml.Optional<DA_Finance_Types.Id[]>;
}
export const AssetLifecycle_Process: daml.Serializable<AssetLifecycle_Process> = ({
  decoder: () => jtv.object({
    lifecycleEffectsCid: daml.ContractId(LifecycleEffects).decoder(),
    depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
    consumingDepositCids: daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit)).decoder(),
    accountIds: daml.Optional(daml.List(DA_Finance_Types.Id)).decoder(),
  }),
})

export type AssetLifecycleRule = {
  account: DA_Finance_Types.Account;
}
export const AssetLifecycleRule: daml.Template<AssetLifecycleRule, AssetLifecycleRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:AssetLifecycleRule'> & {
  Archive: daml.Choice<AssetLifecycleRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, AssetLifecycleRule.Key>;
  AssetLifecycle_Process: daml.Choice<AssetLifecycleRule, AssetLifecycle_Process, daml.ContractId<DA_Finance_Asset.AssetDeposit>[], AssetLifecycleRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:AssetLifecycleRule',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    account: DA_Finance_Types.Account.decoder(),
  }),
  Archive: {
    template: () => AssetLifecycleRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  AssetLifecycle_Process: {
    template: () => AssetLifecycleRule,
    choiceName: 'AssetLifecycle_Process',
    argumentDecoder: AssetLifecycle_Process.decoder,
    resultDecoder: () => daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit)).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AssetLifecycleRule {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(AssetLifecycleRule);
