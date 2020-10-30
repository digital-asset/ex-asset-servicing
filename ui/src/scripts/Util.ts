import { EquityOption, ExerciseType, OptionType, SettlementType } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { Account, Asset, Id } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Types";
import { Party } from "@daml/types";

export const empty = { textMap: {} };

export const getId = (signatory : Party, label : string) : Id => {
  return { signatories: { textMap: { [signatory]: {} } }, label, version: "0" }
}

export const getAccount = (provider : Party, owner : Party, label : string) : Account => {
  const id = getId(provider, label);
  return { id, provider, owner };
}

export const getAsset = (signatory : Party, label: string, quantity: string) : Asset => {
  const id = getId (signatory, label);
  return { id, quantity };
}

export const getOptionEuropeanCash = (id : Id, underlyingId : Id, optionType : OptionType, strike : string, contractSize : string, maturity : string, observer : Party) : EquityOption => {
  return {
    id,
    underlyingId,
    optionType,
    exerciseType : ExerciseType.EUROPEAN,
    strike,
    contractSize,
    maturity,
    settlementType : SettlementType.CASH,
    observers : { textMap: { [observer]: {} } }
  };
}