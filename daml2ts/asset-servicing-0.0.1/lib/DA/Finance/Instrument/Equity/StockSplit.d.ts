import * as daml from '@daml/types';
import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type EquityStockSplit_SetObservers = {
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const EquityStockSplit_SetObservers: daml.Serializable<EquityStockSplit_SetObservers>;
export declare type EquityStockSplit = {
    id: DA_Finance_Types.Id;
    exDate: daml.Date;
    rFactor: daml.Numeric;
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const EquityStockSplit: daml.Template<EquityStockSplit, EquityStockSplit.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.StockSplit:EquityStockSplit'> & {
    Archive: daml.Choice<EquityStockSplit, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityStockSplit.Key>;
    EquityStockSplit_SetObservers: daml.Choice<EquityStockSplit, EquityStockSplit_SetObservers, daml.ContractId<EquityStockSplit>, EquityStockSplit.Key>;
};
export declare namespace EquityStockSplit {
    type Key = DA_Finance_Types.Id;
}
