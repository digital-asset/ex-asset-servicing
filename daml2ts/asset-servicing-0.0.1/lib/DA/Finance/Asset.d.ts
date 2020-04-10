import * as daml from '@daml/types';
import * as DA_Finance_Types from '../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type AssetCategorization_SetObservers = {
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const AssetCategorization_SetObservers: daml.Serializable<AssetCategorization_SetObservers>;
export declare type AssetCategorization = {
    id: DA_Finance_Types.Id;
    assetType: string;
    assetClass: string;
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const AssetCategorization: daml.Template<AssetCategorization, undefined, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset:AssetCategorization'> & {
    Archive: daml.Choice<AssetCategorization, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, undefined>;
    AssetCategorization_SetObservers: daml.Choice<AssetCategorization, AssetCategorization_SetObservers, daml.ContractId<AssetCategorization>, undefined>;
};
export declare type AssetDeposit_Merge = {
    depositCids: daml.ContractId<AssetDeposit>[];
};
export declare const AssetDeposit_Merge: daml.Serializable<AssetDeposit_Merge>;
export declare type AssetDeposit_Split = {
    quantities: daml.Numeric[];
};
export declare const AssetDeposit_Split: daml.Serializable<AssetDeposit_Split>;
export declare type AssetDeposit_SetObservers = {
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const AssetDeposit_SetObservers: daml.Serializable<AssetDeposit_SetObservers>;
export declare type AssetDeposit = {
    account: DA_Finance_Types.Account;
    asset: DA_Finance_Types.Asset;
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const AssetDeposit: daml.Template<AssetDeposit, undefined, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset:AssetDeposit'> & {
    Archive: daml.Choice<AssetDeposit, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, undefined>;
    AssetDeposit_Merge: daml.Choice<AssetDeposit, AssetDeposit_Merge, daml.ContractId<AssetDeposit>, undefined>;
    AssetDeposit_Split: daml.Choice<AssetDeposit, AssetDeposit_Split, daml.ContractId<AssetDeposit>[], undefined>;
    AssetDeposit_SetObservers: daml.Choice<AssetDeposit, AssetDeposit_SetObservers, daml.ContractId<AssetDeposit>, undefined>;
};
