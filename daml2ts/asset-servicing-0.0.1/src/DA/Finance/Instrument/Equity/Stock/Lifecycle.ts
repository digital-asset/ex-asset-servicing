// Generated from DA/Finance/Instrument/Equity/Stock/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset_Lifecycle from '../../../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Instrument_Equity_CashDividend from '../../../../..//DA/Finance/Instrument/Equity/CashDividend';
import * as DA_Finance_Instrument_Equity_Stock from '../../../../..//DA/Finance/Instrument/Equity/Stock';
import * as DA_Finance_Instrument_Equity_StockSplit from '../../../../..//DA/Finance/Instrument/Equity/StockSplit';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type EquityStockSplit_Lifecycle = {
  stockSplitCid: daml.ContractId<DA_Finance_Instrument_Equity_StockSplit.EquityStockSplit>;
}
export const EquityStockSplit_Lifecycle: daml.Serializable<EquityStockSplit_Lifecycle> = ({
  decoder: () => jtv.object({
    stockSplitCid: daml.ContractId(DA_Finance_Instrument_Equity_StockSplit.EquityStockSplit).decoder(),
  }),
})

export type EquityStockSplitRule = {
  signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const EquityStockSplitRule: daml.Template<EquityStockSplitRule, EquityStockSplitRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Stock.Lifecycle:EquityStockSplitRule'> & {
  Archive: daml.Choice<EquityStockSplitRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityStockSplitRule.Key>;
  EquityStockSplit_Lifecycle: daml.Choice<EquityStockSplitRule, EquityStockSplit_Lifecycle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.ContractId<DA_Finance_Instrument_Equity_Stock.EquityStock>, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>>, EquityStockSplitRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Stock.Lifecycle:EquityStockSplitRule',
  keyDecoder: () => pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  decoder: () => jtv.object({
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => EquityStockSplitRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  EquityStockSplit_Lifecycle: {
    template: () => EquityStockSplitRule,
    choiceName: 'EquityStockSplit_Lifecycle',
    argumentDecoder: EquityStockSplit_Lifecycle.decoder,
    resultDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.ContractId(DA_Finance_Instrument_Equity_Stock.EquityStock), daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects)).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EquityStockSplitRule {
  export type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>
}
daml.registerTemplate(EquityStockSplitRule);

export type EquityStockCashDividend_Lifecycle = {
  dividendCid: daml.ContractId<DA_Finance_Instrument_Equity_CashDividend.EquityCashDividend>;
  entitlementIdLabel: string;
}
export const EquityStockCashDividend_Lifecycle: daml.Serializable<EquityStockCashDividend_Lifecycle> = ({
  decoder: () => jtv.object({
    dividendCid: daml.ContractId(DA_Finance_Instrument_Equity_CashDividend.EquityCashDividend).decoder(),
    entitlementIdLabel: daml.Text.decoder(),
  }),
})

export type EquityStockCashDividendRule = {
  signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const EquityStockCashDividendRule: daml.Template<EquityStockCashDividendRule, EquityStockCashDividendRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Stock.Lifecycle:EquityStockCashDividendRule'> & {
  EquityStockCashDividend_Lifecycle: daml.Choice<EquityStockCashDividendRule, EquityStockCashDividend_Lifecycle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.ContractId<DA_Finance_Instrument_Equity_Stock.EquityStock>, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>>, EquityStockCashDividendRule.Key>;
  Archive: daml.Choice<EquityStockCashDividendRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityStockCashDividendRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Stock.Lifecycle:EquityStockCashDividendRule',
  keyDecoder: () => pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  decoder: () => jtv.object({
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  EquityStockCashDividend_Lifecycle: {
    template: () => EquityStockCashDividendRule,
    choiceName: 'EquityStockCashDividend_Lifecycle',
    argumentDecoder: EquityStockCashDividend_Lifecycle.decoder,
    resultDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.ContractId(DA_Finance_Instrument_Equity_Stock.EquityStock), daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects)).decoder(),
  },
  Archive: {
    template: () => EquityStockCashDividendRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EquityStockCashDividendRule {
  export type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>
}
daml.registerTemplate(EquityStockCashDividendRule);
