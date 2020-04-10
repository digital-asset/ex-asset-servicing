import * as daml from '@daml/types';
import * as DA_Finance_Asset from '../../../..//DA/Finance/Asset';
import * as DA_Finance_Trade_Dvp from '../../../..//DA/Finance/Trade/Dvp';
import * as DA_Finance_Trade_SettlementInstruction from '../../../..//DA/Finance/Trade/SettlementInstruction';
import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type DvpSettlement_Process = {
    dvpCid: daml.ContractId<DA_Finance_Trade_Dvp.Dvp>;
    paymentInstructionCids: daml.ContractId<DA_Finance_Trade_SettlementInstruction.SettlementInstruction>[];
    deliveryInstructionCids: daml.ContractId<DA_Finance_Trade_SettlementInstruction.SettlementInstruction>[];
    ctrl: daml.Party;
};
export declare const DvpSettlement_Process: daml.Serializable<DvpSettlement_Process>;
export declare type DvpSettlementRule = {
    masterAgreement: DA_Finance_Types.MasterAgreement;
};
export declare const DvpSettlementRule: daml.Template<DvpSettlementRule, DvpSettlementRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Settlement:DvpSettlementRule'> & {
    DvpSettlement_Process: daml.Choice<DvpSettlementRule, DvpSettlement_Process, DvpSettlement_Process_Result, DvpSettlementRule.Key>;
    Archive: daml.Choice<DvpSettlementRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, DvpSettlementRule.Key>;
};
export declare namespace DvpSettlementRule {
    type Key = DA_Finance_Types.Id;
}
export declare type DvpSettlement_Process_Result = {
    dvpCid: daml.ContractId<DA_Finance_Trade_Dvp.Dvp>;
    paymentDepositCids: daml.ContractId<DA_Finance_Asset.AssetDeposit>[][];
    deliveryDepositCids: daml.ContractId<DA_Finance_Asset.AssetDeposit>[][];
};
export declare const DvpSettlement_Process_Result: daml.Serializable<DvpSettlement_Process_Result>;
