// Generated from DA/Finance/Instrument/Equity/Option.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Types from '../../../..//DA/Finance/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type EquityOption_SetObservers = {
  newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const EquityOption_SetObservers: daml.Serializable<EquityOption_SetObservers> = ({
  decoder: () => jtv.object({
    newObservers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
})

export type EquityOption = {
  id: DA_Finance_Types.Id;
  underlyingId: DA_Finance_Types.Id;
  optionType: OptionType;
  exerciseType: ExerciseType;
  strike: daml.Numeric;
  contractSize: daml.Numeric;
  maturity: daml.Date;
  settlementType: SettlementType;
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const EquityOption: daml.Template<EquityOption, EquityOption.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option:EquityOption'> & {
  Archive: daml.Choice<EquityOption, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EquityOption.Key>;
  EquityOption_SetObservers: daml.Choice<EquityOption, EquityOption_SetObservers, daml.ContractId<EquityOption>, EquityOption.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.Equity.Option:EquityOption',
  keyDecoder: () => DA_Finance_Types.Id.decoder(),
  decoder: () => jtv.object({
    id: DA_Finance_Types.Id.decoder(),
    underlyingId: DA_Finance_Types.Id.decoder(),
    optionType: OptionType.decoder(),
    exerciseType: ExerciseType.decoder(),
    strike: daml.Numeric(10).decoder(),
    contractSize: daml.Numeric(10).decoder(),
    maturity: daml.Date.decoder(),
    settlementType: SettlementType.decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => EquityOption,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  EquityOption_SetObservers: {
    template: () => EquityOption,
    choiceName: 'EquityOption_SetObservers',
    argumentDecoder: EquityOption_SetObservers.decoder,
    resultDecoder: () => daml.ContractId(EquityOption).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EquityOption {
  export type Key = DA_Finance_Types.Id
}
daml.registerTemplate(EquityOption);

export enum SettlementType {
  CASH = 'CASH',
  PHYSICAL = 'PHYSICAL',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<SettlementType>(SettlementType)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SettlementType {
  export const decoder = () => jtv.oneOf<SettlementType>(
    jtv.constant(SettlementType.CASH),
    jtv.constant(SettlementType.PHYSICAL),
  );
}

export enum ExerciseType {
  EUROPEAN = 'EUROPEAN',
  AMERICAN = 'AMERICAN',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<ExerciseType>(ExerciseType)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ExerciseType {
  export const decoder = () => jtv.oneOf<ExerciseType>(
    jtv.constant(ExerciseType.EUROPEAN),
    jtv.constant(ExerciseType.AMERICAN),
  );
}

export enum OptionType {
  PUT = 'PUT',
  CALL = 'CALL',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<OptionType>(OptionType)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OptionType {
  export const decoder = () => jtv.oneOf<OptionType>(
    jtv.constant(OptionType.PUT),
    jtv.constant(OptionType.CALL),
  );
}
