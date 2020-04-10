// Generated from DA/Finance/Tutorial.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Trade_Dvp from '../..//DA/Finance/Trade/Dvp';
import * as DA_Finance_Trade_Dvp_Settlement from '../..//DA/Finance/Trade/Dvp/Settlement';
import * as DA_Finance_Trade_SettlementInstruction from '../..//DA/Finance/Trade/SettlementInstruction';
import * as DA_Finance_Types from '../..//DA/Finance/Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Accept = {
}
export const Accept: daml.Serializable<Accept> = ({
  decoder: () => jtv.object({
  }),
})

export type DvpProposal = {
  tradeId: DA_Finance_Types.Id;
  asset: DA_Finance_Types.Asset;
  proposerAccount: DA_Finance_Types.Account;
  proposerBankAccount: DA_Finance_Types.Account;
  proposerBankOwnAccount: DA_Finance_Types.Account;
  counterpartyAccount: DA_Finance_Types.Account;
  counterpartyBankAccount: DA_Finance_Types.Account;
  counterpartyBankOwnAccount: DA_Finance_Types.Account;
}
export const DvpProposal: daml.Template<DvpProposal, undefined, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Tutorial:DvpProposal'> & {
  Archive: daml.Choice<DvpProposal, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, undefined>;
  Accept: daml.Choice<DvpProposal, Accept, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3<daml.ContractId<DA_Finance_Trade_Dvp.Dvp>, daml.ContractId<DA_Finance_Trade_SettlementInstruction.SettlementInstruction>, daml.ContractId<DA_Finance_Trade_Dvp_Settlement.DvpSettlementRule>>, undefined>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Tutorial:DvpProposal',
  keyDecoder: () => jtv.constant(undefined),
  decoder: () => jtv.object({
    tradeId: DA_Finance_Types.Id.decoder(),
    asset: DA_Finance_Types.Asset.decoder(),
    proposerAccount: DA_Finance_Types.Account.decoder(),
    proposerBankAccount: DA_Finance_Types.Account.decoder(),
    proposerBankOwnAccount: DA_Finance_Types.Account.decoder(),
    counterpartyAccount: DA_Finance_Types.Account.decoder(),
    counterpartyBankAccount: DA_Finance_Types.Account.decoder(),
    counterpartyBankOwnAccount: DA_Finance_Types.Account.decoder(),
  }),
  Archive: {
    template: () => DvpProposal,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  Accept: {
    template: () => DvpProposal,
    choiceName: 'Accept',
    argumentDecoder: Accept.decoder,
    resultDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3(daml.ContractId(DA_Finance_Trade_Dvp.Dvp), daml.ContractId(DA_Finance_Trade_SettlementInstruction.SettlementInstruction), daml.ContractId(DA_Finance_Trade_Dvp_Settlement.DvpSettlementRule)).decoder(),
  },
};
daml.registerTemplate(DvpProposal);
