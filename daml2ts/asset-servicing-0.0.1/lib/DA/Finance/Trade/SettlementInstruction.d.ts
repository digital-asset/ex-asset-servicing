import * as daml from '@daml/types';
import * as DA_Finance_Asset from '../../..//DA/Finance/Asset';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type SettlementInstruction_AllocateNext = {
    depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
    ctrl: daml.Party;
};
export declare const SettlementInstruction_AllocateNext: daml.Serializable<SettlementInstruction_AllocateNext>;
export declare type SettlementInstruction_Archive = {};
export declare const SettlementInstruction_Archive: daml.Serializable<SettlementInstruction_Archive>;
export declare type SettlementInstruction_Process = {};
export declare const SettlementInstruction_Process: daml.Serializable<SettlementInstruction_Process>;
export declare type SettlementInstruction = {
    masterAgreement: DA_Finance_Types.MasterAgreement;
    tradeId: DA_Finance_Types.Id;
    asset: DA_Finance_Types.Asset;
    steps: SettlementDetails[];
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const SettlementInstruction: daml.Template<SettlementInstruction, SettlementInstruction.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.SettlementInstruction:SettlementInstruction'> & {
    SettlementInstruction_AllocateNext: daml.Choice<SettlementInstruction, SettlementInstruction_AllocateNext, daml.ContractId<SettlementInstruction>, SettlementInstruction.Key>;
    Archive: daml.Choice<SettlementInstruction, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, SettlementInstruction.Key>;
    SettlementInstruction_Process: daml.Choice<SettlementInstruction, SettlementInstruction_Process, daml.ContractId<DA_Finance_Asset.AssetDeposit>[], SettlementInstruction.Key>;
    SettlementInstruction_Archive: daml.Choice<SettlementInstruction, SettlementInstruction_Archive, {}, SettlementInstruction.Key>;
};
export declare namespace SettlementInstruction {
    type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3<DA_Finance_Types.Id, DA_Finance_Types.Id, DA_Finance_Types.Id>;
}
export declare type SettlementDetails = {
    senderAccount: DA_Finance_Types.Account;
    receiverAccount: DA_Finance_Types.Account;
    depositCid: daml.Optional<daml.ContractId<DA_Finance_Asset.AssetDeposit>>;
};
export declare const SettlementDetails: daml.Serializable<SettlementDetails>;
