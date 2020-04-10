import * as daml from '@daml/types';
import * as DA_Finance_Asset_Lifecycle from '../../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Trade_Dvp from '../../../..//DA/Finance/Trade/Dvp';
import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type DvpLifecycle_Process = {
    dvpCid: daml.ContractId<DA_Finance_Trade_Dvp.Dvp>;
    lifecycleEffectsCid: daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>;
    ctrl: daml.Party;
};
export declare const DvpLifecycle_Process: daml.Serializable<DvpLifecycle_Process>;
export declare type DvpLifecycleRule = {
    masterAgreement: DA_Finance_Types.MasterAgreement;
};
export declare const DvpLifecycleRule: daml.Template<DvpLifecycleRule, DvpLifecycleRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Lifecycle:DvpLifecycleRule'> & {
    DvpLifecycle_Process: daml.Choice<DvpLifecycleRule, DvpLifecycle_Process, daml.ContractId<DA_Finance_Trade_Dvp.Dvp>, DvpLifecycleRule.Key>;
    Archive: daml.Choice<DvpLifecycleRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, DvpLifecycleRule.Key>;
};
export declare namespace DvpLifecycleRule {
    type Key = DA_Finance_Types.Id;
}
