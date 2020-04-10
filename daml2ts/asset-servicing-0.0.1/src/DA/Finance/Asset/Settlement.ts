// Generated from DA/Finance/Asset/Settlement.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset from '../../..//DA/Finance/Asset';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type AssetSettlement_Credit = {
  asset: DA_Finance_Types.Asset;
  ctrl: daml.Party;
}
export const AssetSettlement_Credit: daml.Serializable<AssetSettlement_Credit> = ({
  decoder: () => jtv.object({
    asset: DA_Finance_Types.Asset.decoder(),
    ctrl: daml.Party.decoder(),
  }),
})

export type AssetSettlement_Debit = {
  depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
}
export const AssetSettlement_Debit: daml.Serializable<AssetSettlement_Debit> = ({
  decoder: () => jtv.object({
    depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
  }),
})

export type AssetSettlement_Transfer = {
  receiverAccountId: DA_Finance_Types.Id;
  depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
}
export const AssetSettlement_Transfer: daml.Serializable<AssetSettlement_Transfer> = ({
  decoder: () => jtv.object({
    receiverAccountId: DA_Finance_Types.Id.decoder(),
    depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
  }),
})

export type AssetSettlementRule = {
  account: DA_Finance_Types.Account;
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
  ctrls: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const AssetSettlementRule: daml.Template<AssetSettlementRule, AssetSettlementRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Settlement:AssetSettlementRule'> & {
  AssetSettlement_Debit: daml.Choice<AssetSettlementRule, AssetSettlement_Debit, DA_Finance_Types.Asset, AssetSettlementRule.Key>;
  Archive: daml.Choice<AssetSettlementRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, AssetSettlementRule.Key>;
  AssetSettlement_Credit: daml.Choice<AssetSettlementRule, AssetSettlement_Credit, daml.ContractId<DA_Finance_Asset.AssetDeposit>, AssetSettlementRule.Key>;
  AssetSettlement_Transfer: daml.Choice<AssetSettlementRule, AssetSettlement_Transfer, daml.ContractId<DA_Finance_Asset.AssetDeposit>, AssetSettlementRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Asset.Settlement:AssetSettlementRule',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    account: DA_Finance_Types.Account.decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    ctrls: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  AssetSettlement_Debit: {
    template: () => AssetSettlementRule,
    choiceName: 'AssetSettlement_Debit',
    argumentDecoder: AssetSettlement_Debit.decoder,
    resultDecoder: () => DA_Finance_Types.Asset.decoder(),
  },
  Archive: {
    template: () => AssetSettlementRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  AssetSettlement_Credit: {
    template: () => AssetSettlementRule,
    choiceName: 'AssetSettlement_Credit',
    argumentDecoder: AssetSettlement_Credit.decoder,
    resultDecoder: () => daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
  },
  AssetSettlement_Transfer: {
    template: () => AssetSettlementRule,
    choiceName: 'AssetSettlement_Transfer',
    argumentDecoder: AssetSettlement_Transfer.decoder,
    resultDecoder: () => daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AssetSettlementRule {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(AssetSettlementRule);
