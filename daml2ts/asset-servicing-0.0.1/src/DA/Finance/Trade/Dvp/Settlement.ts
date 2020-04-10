// Generated from DA/Finance/Trade/Dvp/Settlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset from '../../../..//DA/Finance/Asset';
import * as DA_Finance_Trade_Dvp from '../../../..//DA/Finance/Trade/Dvp';
import * as DA_Finance_Trade_SettlementInstruction from '../../../..//DA/Finance/Trade/SettlementInstruction';
import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type DvpSettlement_Process = {
  dvpCid: daml.ContractId<DA_Finance_Trade_Dvp.Dvp>;
  paymentInstructionCids: daml.ContractId<DA_Finance_Trade_SettlementInstruction.SettlementInstruction>[];
  deliveryInstructionCids: daml.ContractId<DA_Finance_Trade_SettlementInstruction.SettlementInstruction>[];
  ctrl: daml.Party;
}
export const DvpSettlement_Process: daml.Serializable<DvpSettlement_Process> = ({
  decoder: () => jtv.object({
    dvpCid: daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
    paymentInstructionCids: daml.List(daml.ContractId(DA_Finance_Trade_SettlementInstruction.SettlementInstruction)).decoder(),
    deliveryInstructionCids: daml.List(daml.ContractId(DA_Finance_Trade_SettlementInstruction.SettlementInstruction)).decoder(),
    ctrl: daml.Party.decoder(),
  }),
})

export type DvpSettlementRule = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
}
export const DvpSettlementRule: daml.Template<DvpSettlementRule, DvpSettlementRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Settlement:DvpSettlementRule'> & {
  DvpSettlement_Process: daml.Choice<DvpSettlementRule, DvpSettlement_Process, DvpSettlement_Process_Result, DvpSettlementRule.Key>;
  Archive: daml.Choice<DvpSettlementRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, DvpSettlementRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Settlement:DvpSettlementRule',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
  }),
  DvpSettlement_Process: {
    template: () => DvpSettlementRule,
    choiceName: 'DvpSettlement_Process',
    argumentDecoder: DvpSettlement_Process.decoder,
    resultDecoder: () => DvpSettlement_Process_Result.decoder(),
  },
  Archive: {
    template: () => DvpSettlementRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DvpSettlementRule {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(DvpSettlementRule);

export type DvpSettlement_Process_Result = {
  dvpCid: daml.ContractId<DA_Finance_Trade_Dvp.Dvp>;
  paymentDepositCids: daml.ContractId<DA_Finance_Asset.AssetDeposit>[][];
  deliveryDepositCids: daml.ContractId<DA_Finance_Asset.AssetDeposit>[][];
}
export const DvpSettlement_Process_Result: daml.Serializable<DvpSettlement_Process_Result> = ({
  decoder: () => jtv.object({
    dvpCid: daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
    paymentDepositCids: daml.List(daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit))).decoder(),
    deliveryDepositCids: daml.List(daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit))).decoder(),
  }),
})
