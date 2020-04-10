import * as daml from '@daml/types';
import * as DA_Finance_Trade_Dvp from './/DA/Finance/Trade/Dvp';
import * as DA_Finance_Trade_Dvp_Settlement from './/DA/Finance/Trade/Dvp/Settlement';
import * as DA_Finance_Trade_SettlementInstruction from './/DA/Finance/Trade/SettlementInstruction';
import * as DA_Finance_Types from './/DA/Finance/Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type Accept = {};
export declare const Accept: daml.Serializable<Accept>;
export declare type DvpProposal = {
    tradeId: DA_Finance_Types.Id;
    asset: DA_Finance_Types.Asset;
    proposerAccount: DA_Finance_Types.Account;
    proposerBankAccount: DA_Finance_Types.Account;
    proposerBankOwnAccount: DA_Finance_Types.Account;
    counterpartyAccount: DA_Finance_Types.Account;
    counterpartyBankAccount: DA_Finance_Types.Account;
    counterpartyBankOwnAccount: DA_Finance_Types.Account;
};
export declare const DvpProposal: daml.Template<DvpProposal, undefined, '8709c7cf647cc053b613ed3289af65d9c93a20cb1862058daa21db7d5ea5dc6c:Tutorial:DvpProposal'> & {
    Archive: daml.Choice<DvpProposal, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, undefined>;
    Accept: daml.Choice<DvpProposal, Accept, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple3<daml.ContractId<DA_Finance_Trade_Dvp.Dvp>, daml.ContractId<DA_Finance_Trade_SettlementInstruction.SettlementInstruction>, daml.ContractId<DA_Finance_Trade_Dvp_Settlement.DvpSettlementRule>>, undefined>;
};
