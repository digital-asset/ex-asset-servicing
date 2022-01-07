import { EquityOption, ExerciseType, OptionType, SettlementType } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Instrument/Equity/Option";
import { Account, Asset, Id } from "@daml.js/asset-servicing-0.0.1/lib/DA/Finance/Types";
import { Set } from "@daml.js/97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657/lib/DA/Set/Types";
import { emptyMap, Party } from "@daml/types";

export const emptySet = <a>(): Set<a> => ({ map: emptyMap<a, {}>() });

export const toSet = <a>(...entries: a[]): Set<a> => ({map: entries.reduce((acc, e) => acc.set(e, {}), emptyMap<a, {}>())});

export const getId = (signatory : Party, label : string) : Id => {
  return { signatories: { map: emptyMap<string, {}>().set(signatory, {}) }, label, version: "0" }
}

export const getAccount = (provider : Party, owner : Party, label : string) : [Id, Account] => {
  const id = getId(provider, label);
  return [ id, { id, provider, owner } ];
}

export const getAsset = (signatory : Party, label: string, quantity: string) : [Id, Asset] => {
  const id = getId (signatory, label);
  const asset : Asset = { id, quantity };
  return [id, asset];
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
    observers : { map: emptyMap<string, {}>().set(observer, {}) }
  };
}