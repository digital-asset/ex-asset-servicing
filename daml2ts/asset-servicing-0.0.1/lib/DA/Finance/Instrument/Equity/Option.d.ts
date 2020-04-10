import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';
import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type EquityOption_SetObservers = {
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const EquityOption_SetObservers: daml.Serializable<EquityOption_SetObservers>;
export declare type EquityOption = {
    id: DA_Finance_Types.Id;
    underlyingId: DA_Finance_Types.Id;
    optionType: OptionType;
    exerciseType: ExerciseType;
    strike: daml.Numeric;
    contractSize: daml.Numeric;
    maturity: daml.Date;
    settlementType: SettlementType;
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
};
export declare const EquityOption: daml.Template<EquityOption, EquityOption.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option:EquityOption'> & {
    Archive: daml.Choice<EquityOption, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityOption.Key>;
    EquityOption_SetObservers: daml.Choice<EquityOption, EquityOption_SetObservers, daml.ContractId<EquityOption>, EquityOption.Key>;
};
export declare namespace EquityOption {
    type Key = DA_Finance_Types.Id;
}
export declare enum SettlementType {
    CASH = "CASH",
    PHYSICAL = "PHYSICAL"
}
export declare namespace SettlementType {
    const decoder: () => jtv.Decoder<SettlementType>;
}
export declare enum ExerciseType {
    EUROPEAN = "EUROPEAN",
    AMERICAN = "AMERICAN"
}
export declare namespace ExerciseType {
    const decoder: () => jtv.Decoder<ExerciseType>;
}
export declare enum OptionType {
    PUT = "PUT",
    CALL = "CALL"
}
export declare namespace OptionType {
    const decoder: () => jtv.Decoder<OptionType>;
}
