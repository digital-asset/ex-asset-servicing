import * as daml from '@daml/types';
import * as DA_Finance_Asset from '../../..//DA/Finance/Asset';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type LifecycleEffects_SetObservers = {
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const LifecycleEffects_SetObservers: daml.Serializable<LifecycleEffects_SetObservers>;
export declare type LifecycleEffects = {
    id: DA_Finance_Types.Id;
    consuming: DA_Finance_Types.Asset[];
    effects: DA_Finance_Types.Asset[];
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const LifecycleEffects: daml.Template<LifecycleEffects, LifecycleEffects.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:LifecycleEffects'> & {
    Archive: daml.Choice<LifecycleEffects, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, LifecycleEffects.Key>;
    LifecycleEffects_SetObservers: daml.Choice<LifecycleEffects, LifecycleEffects_SetObservers, daml.ContractId<LifecycleEffects>, LifecycleEffects.Key>;
};
export declare namespace LifecycleEffects {
    type Key = DA_Finance_Types.Id;
}
export declare type AssetLifecycle_Process = {
    lifecycleEffectsCid: daml.ContractId<LifecycleEffects>;
    depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
    consumingDepositCids: daml.ContractId<DA_Finance_Asset.AssetDeposit>[];
    accountIds: daml.Optional<DA_Finance_Types.Id[]>;
};
export declare const AssetLifecycle_Process: daml.Serializable<AssetLifecycle_Process>;
export declare type AssetLifecycleRule = {
    account: DA_Finance_Types.Account;
};
export declare const AssetLifecycleRule: daml.Template<AssetLifecycleRule, AssetLifecycleRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Lifecycle:AssetLifecycleRule'> & {
    Archive: daml.Choice<AssetLifecycleRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, AssetLifecycleRule.Key>;
    AssetLifecycle_Process: daml.Choice<AssetLifecycleRule, AssetLifecycle_Process, daml.ContractId<DA_Finance_Asset.AssetDeposit>[], AssetLifecycleRule.Key>;
};
export declare namespace AssetLifecycleRule {
    type Key = DA_Finance_Types.Id;
}
