// Generated from DA/Finance/Instrument/Equity/Option/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset_Lifecycle from '../../../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Instrument_Entitlement from '../../../../..//DA/Finance/Instrument/Entitlement';
import * as DA_Finance_Instrument_Equity_Option from '../../../../..//DA/Finance/Instrument/Equity/Option';
import * as DA_Finance_Instrument_Equity_StockSplit from '../../../../..//DA/Finance/Instrument/Equity/StockSplit';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type EquityOptionStockSplit_Lifecycle = {
  optionCid: daml.ContractId<DA_Finance_Instrument_Equity_Option.EquityOption>;
  stockSplitCid: daml.ContractId<DA_Finance_Instrument_Equity_StockSplit.EquityStockSplit>;
}
export const EquityOptionStockSplit_Lifecycle: daml.Serializable<EquityOptionStockSplit_Lifecycle> = ({
  decoder: () => jtv.object({
    optionCid: daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption).decoder(),
    stockSplitCid: daml.ContractId(DA_Finance_Instrument_Equity_StockSplit.EquityStockSplit).decoder(),
  }),
})

export type EquityOptionStockSplitRule = {
  signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const EquityOptionStockSplitRule: daml.Template<EquityOptionStockSplitRule, EquityOptionStockSplitRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option.Lifecycle:EquityOptionStockSplitRule'> & {
  Archive: daml.Choice<EquityOptionStockSplitRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityOptionStockSplitRule.Key>;
  EquityOptionStockSplit_Lifecycle: daml.Choice<EquityOptionStockSplitRule, EquityOptionStockSplit_Lifecycle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.ContractId<DA_Finance_Instrument_Equity_Option.EquityOption>, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>>, EquityOptionStockSplitRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option.Lifecycle:EquityOptionStockSplitRule',
  keyDecoder: () => pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  decoder: () => jtv.object({
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => EquityOptionStockSplitRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  EquityOptionStockSplit_Lifecycle: {
    template: () => EquityOptionStockSplitRule,
    choiceName: 'EquityOptionStockSplit_Lifecycle',
    argumentDecoder: EquityOptionStockSplit_Lifecycle.decoder,
    resultDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption), daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects)).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EquityOptionStockSplitRule {
  export type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>
}
daml.registerTemplate(EquityOptionStockSplitRule);

export type EquityOptionStockSplit_Result = {
  optionCid: daml.ContractId<DA_Finance_Instrument_Equity_Option.EquityOption>;
  lifecycleEffectsCid: daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>;
}
export const EquityOptionStockSplit_Result: daml.Serializable<EquityOptionStockSplit_Result> = ({
  decoder: () => jtv.object({
    optionCid: daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption).decoder(),
    lifecycleEffectsCid: daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
  }),
})

export type EquityOptionExercise_Lifecycle = {
  optionCid: daml.ContractId<DA_Finance_Instrument_Equity_Option.EquityOption>;
  underlyingPrice: daml.Optional<daml.Numeric>;
  entitlementIdLabel: string;
  settlementDate: daml.Date;
}
export const EquityOptionExercise_Lifecycle: daml.Serializable<EquityOptionExercise_Lifecycle> = ({
  decoder: () => jtv.object({
    optionCid: daml.ContractId(DA_Finance_Instrument_Equity_Option.EquityOption).decoder(),
    underlyingPrice: daml.Optional(daml.Numeric(10)).decoder(),
    entitlementIdLabel: daml.Text.decoder(),
    settlementDate: daml.Date.decoder(),
  }),
})

export type EquityOptionExerciseRule = {
  signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const EquityOptionExerciseRule: daml.Template<EquityOptionExerciseRule, EquityOptionExerciseRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option.Lifecycle:EquityOptionExerciseRule'> & {
  EquityOptionExercise_Lifecycle: daml.Choice<EquityOptionExerciseRule, EquityOptionExercise_Lifecycle, EquityOptionExercise_Result, EquityOptionExerciseRule.Key>;
  Archive: daml.Choice<EquityOptionExerciseRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityOptionExerciseRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option.Lifecycle:EquityOptionExerciseRule',
  keyDecoder: () => pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  decoder: () => jtv.object({
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  EquityOptionExercise_Lifecycle: {
    template: () => EquityOptionExerciseRule,
    choiceName: 'EquityOptionExercise_Lifecycle',
    argumentDecoder: EquityOptionExercise_Lifecycle.decoder,
    resultDecoder: () => EquityOptionExercise_Result.decoder(),
  },
  Archive: {
    template: () => EquityOptionExerciseRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EquityOptionExerciseRule {
  export type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>
}
daml.registerTemplate(EquityOptionExerciseRule);

export type EquityOptionExercise_Result = {
  entitlementCid: daml.ContractId<DA_Finance_Instrument_Entitlement.Entitlement>;
  lifecycleEffectsCid: daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>;
}
export const EquityOptionExercise_Result: daml.Serializable<EquityOptionExercise_Result> = ({
  decoder: () => jtv.object({
    entitlementCid: daml.ContractId(DA_Finance_Instrument_Entitlement.Entitlement).decoder(),
    lifecycleEffectsCid: daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects).decoder(),
  }),
})
