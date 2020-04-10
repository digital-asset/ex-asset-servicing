// Generated from DA/Finance/Trade/SettlementInstruction.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset from '../../..//DA/Finance/Asset';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type SettlementInstruction_AllocateNext = {
  depositCid: daml.ContractId<DA_Finance_Asset.AssetDeposit>;
  ctrl: daml.Party;
}
export const SettlementInstruction_AllocateNext: daml.Serializable<SettlementInstruction_AllocateNext> = ({
  decoder: () => jtv.object({
    depositCid: daml.ContractId(DA_Finance_Asset.AssetDeposit).decoder(),
    ctrl: daml.Party.decoder(),
  }),
})

export type SettlementInstruction_Archive = {
}
export const SettlementInstruction_Archive: daml.Serializable<SettlementInstruction_Archive> = ({
  decoder: () => jtv.object({
  }),
})

export type SettlementInstruction_Process = {
}
export const SettlementInstruction_Process: daml.Serializable<SettlementInstruction_Process> = ({
  decoder: () => jtv.object({
  }),
})

export type SettlementInstruction = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  tradeId: DA_Finance_Types.Id;
  asset: DA_Finance_Types.Asset;
  steps: SettlementDetails[];
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const SettlementInstruction: daml.Template<SettlementInstruction, SettlementInstruction.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.SettlementInstruction:SettlementInstruction'> & {
  SettlementInstruction_AllocateNext: daml.Choice<SettlementInstruction, SettlementInstruction_AllocateNext, daml.ContractId<SettlementInstruction>, SettlementInstruction.Key>;
  Archive: daml.Choice<SettlementInstruction, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, SettlementInstruction.Key>;
  SettlementInstruction_Process: daml.Choice<SettlementInstruction, SettlementInstruction_Process, daml.ContractId<DA_Finance_Asset.AssetDeposit>[], SettlementInstruction.Key>;
  SettlementInstruction_Archive: daml.Choice<SettlementInstruction, SettlementInstruction_Archive, {}, SettlementInstruction.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.SettlementInstruction:SettlementInstruction',
  keyDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3(DA_Finance_Types.Id, DA_Finance_Types.Id, DA_Finance_Types.Id).decoder(),
  decoder: () => jtv.object({
    masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
    tradeId: DA_Finance_Types.Id.decoder(),
    asset: DA_Finance_Types.Asset.decoder(),
    steps: daml.List(SettlementDetails).decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  SettlementInstruction_AllocateNext: {
    template: () => SettlementInstruction,
    choiceName: 'SettlementInstruction_AllocateNext',
    argumentDecoder: SettlementInstruction_AllocateNext.decoder,
    resultDecoder: () => daml.ContractId(SettlementInstruction).decoder(),
  },
  Archive: {
    template: () => SettlementInstruction,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  SettlementInstruction_Process: {
    template: () => SettlementInstruction,
    choiceName: 'SettlementInstruction_Process',
    argumentDecoder: SettlementInstruction_Process.decoder,
    resultDecoder: () => daml.List(daml.ContractId(DA_Finance_Asset.AssetDeposit)).decoder(),
  },
  SettlementInstruction_Archive: {
    template: () => SettlementInstruction,
    choiceName: 'SettlementInstruction_Archive',
    argumentDecoder: SettlementInstruction_Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SettlementInstruction {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3<DA_Finance_Types.Id, DA_Finance_Types.Id, DA_Finance_Types.Id>
}
daml.registerTemplate(SettlementInstruction);

export type SettlementDetails = {
  senderAccount: DA_Finance_Types.Account;
  receiverAccount: DA_Finance_Types.Account;
  depositCid: daml.Optional<daml.ContractId<DA_Finance_Asset.AssetDeposit>>;
}
export const SettlementDetails: daml.Serializable<SettlementDetails> = ({
  decoder: () => jtv.object({
    senderAccount: DA_Finance_Types.Account.decoder(),
    receiverAccount: DA_Finance_Types.Account.decoder(),
    depositCid: daml.Optional(daml.ContractId(DA_Finance_Asset.AssetDeposit)).decoder(),
  }),
})
