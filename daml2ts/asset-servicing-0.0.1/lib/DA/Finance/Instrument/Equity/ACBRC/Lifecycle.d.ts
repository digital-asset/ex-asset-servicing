import * as daml from '@daml/types';
import * as DA_Finance_Asset_Lifecycle from '../../../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Instrument_Equity_ACBRC from '../../../../..//DA/Finance/Instrument/Equity/ACBRC';
import * as DA_Finance_Instrument_Equity_StockSplit from '../../../../..//DA/Finance/Instrument/Equity/StockSplit';
import * as DA_Finance_RefData_Fixing from '../../../../..//DA/Finance/RefData/Fixing';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type ACBRCFixing_Lifecycle = {
    acbrcCid: daml.ContractId<DA_Finance_Instrument_Equity_ACBRC.ACBRC>;
    fixingCid: daml.ContractId<DA_Finance_RefData_Fixing.Fixing>;
};
export declare const ACBRCFixing_Lifecycle: daml.Serializable<ACBRCFixing_Lifecycle>;
export declare type ACBRCFixingRule = {
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const ACBRCFixingRule: daml.Template<ACBRCFixingRule, ACBRCFixingRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.ACBRC.Lifecycle:ACBRCFixingRule'> & {
    Archive: daml.Choice<ACBRCFixingRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, ACBRCFixingRule.Key>;
    ACBRCFixing_Lifecycle: daml.Choice<ACBRCFixingRule, ACBRCFixing_Lifecycle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.ContractId<DA_Finance_Instrument_Equity_ACBRC.ACBRC>, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>>, ACBRCFixingRule.Key>;
};
export declare namespace ACBRCFixingRule {
    type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export declare type ACBRCStockSplit_Lifecycle = {
    acbrcCid: daml.ContractId<DA_Finance_Instrument_Equity_ACBRC.ACBRC>;
    stockSplitCid: daml.ContractId<DA_Finance_Instrument_Equity_StockSplit.EquityStockSplit>;
};
export declare const ACBRCStockSplit_Lifecycle: daml.Serializable<ACBRCStockSplit_Lifecycle>;
export declare type ACBRCStockSplitRule = {
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const ACBRCStockSplitRule: daml.Template<ACBRCStockSplitRule, ACBRCStockSplitRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.ACBRC.Lifecycle:ACBRCStockSplitRule'> & {
    ACBRCStockSplit_Lifecycle: daml.Choice<ACBRCStockSplitRule, ACBRCStockSplit_Lifecycle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.ContractId<DA_Finance_Instrument_Equity_ACBRC.ACBRC>, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>>, ACBRCStockSplitRule.Key>;
    Archive: daml.Choice<ACBRCStockSplitRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, ACBRCStockSplitRule.Key>;
};
export declare namespace ACBRCStockSplitRule {
    type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
