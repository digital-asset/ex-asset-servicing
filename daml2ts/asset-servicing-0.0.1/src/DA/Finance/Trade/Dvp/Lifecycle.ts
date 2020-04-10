// Generated from DA/Finance/Trade/Dvp/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset_Lifecycle from '../../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Trade_Dvp from '../../../..//DA/Finance/Trade/Dvp';
import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type DvpLifecycle_Process = {
  dvpCid: daml.ContractId<DA_Finance_Trade_Dvp.Dvp>;
  lifecycleEffectsCid: daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>;
  ctrl: daml.Party;
}
export const DvpLifecycle_Process: daml.Serializable<DvpLifecycle_Process> = ({
  decoder: () => jtv.object({
    dvpCid: daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
    lifecycleEffectsCid: daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
    ctrl: daml.Party.decoder(),
  }),
})

export type DvpLifecycleRule = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
}
export const DvpLifecycleRule: daml.Template<DvpLifecycleRule, DvpLifecycleRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Lifecycle:DvpLifecycleRule'> & {
  DvpLifecycle_Process: daml.Choice<DvpLifecycleRule, DvpLifecycle_Process, daml.ContractId<DA_Finance_Trade_Dvp.Dvp>, DvpLifecycleRule.Key>;
  Archive: daml.Choice<DvpLifecycleRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, DvpLifecycleRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp.Lifecycle:DvpLifecycleRule',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
  }),
  DvpLifecycle_Process: {
    template: () => DvpLifecycleRule,
    choiceName: 'DvpLifecycle_Process',
    argumentDecoder: DvpLifecycle_Process.decoder,
    resultDecoder: () => daml.ContractId(DA_Finance_Trade_Dvp.Dvp).decoder(),
  },
  Archive: {
    template: () => DvpLifecycleRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DvpLifecycleRule {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(DvpLifecycleRule);
