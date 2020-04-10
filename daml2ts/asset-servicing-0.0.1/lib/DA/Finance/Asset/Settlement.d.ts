import * as daml from '@daml/types';
import * as DA_Finance_Asset from '../../..//DA/Finance/Asset';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type AssetSettlement_Credit = {
    asset: DA_Finance_Types.Asset;
    ctrl: daml.Party;
};
export declare const AssetSettlement_Credit: daml.Serializable<AssetSettlement_Credit>;
export declare type AssetSettlement_Debit = {
    depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
};
export declare const AssetSettlement_Debit: daml.Serializable<AssetSettlement_Debit>;
export declare type AssetSettlement_Transfer = {
    receiverAccountId: DA_Finance_Types.Id;
    depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
};
export declare const AssetSettlement_Transfer: daml.Serializable<AssetSettlement_Transfer>;
export declare type AssetSettlementRule = {
    account: DA_Finance_Types.Account;
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
    ctrls: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const AssetSettlementRule: daml.Template<AssetSettlementRule, AssetSettlementRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Settlement:AssetSettlementRule'> & {
    AssetSettlement_Debit: daml.Choice<AssetSettlementRule, AssetSettlement_Debit, DA_Finance_Types.Asset, AssetSettlementRule.Key>;
    Archive: daml.Choice<AssetSettlementRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, AssetSettlementRule.Key>;
    AssetSettlement_Credit: daml.Choice<AssetSettlementRule, AssetSettlement_Credit, daml.ContractId<DA_Finance_Asset.AssetDeposit>, AssetSettlementRule.Key>;
    AssetSettlement_Transfer: daml.Choice<AssetSettlementRule, AssetSettlement_Transfer, daml.ContractId<DA_Finance_Asset.AssetDeposit>, AssetSettlementRule.Key>;
};
export declare namespace AssetSettlementRule {
    type Key = DA_Finance_Types.Id;
}
