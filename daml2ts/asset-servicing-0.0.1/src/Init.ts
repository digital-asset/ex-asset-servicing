// Generated from Init.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Types from './/DA/Finance/Types';

export type Accounts = {
  jpmSnbAccount: DA_Finance_Types.Account;
  jpmSixAccount: DA_Finance_Types.Account;
  jpmEurexAccount: DA_Finance_Types.Account;
}
export const Accounts: daml.Serializable<Accounts> = ({
  decoder: () => jtv.object({
    jpmSnbAccount: DA_Finance_Types.Account.decoder(),
    jpmSixAccount: DA_Finance_Types.Account.decoder(),
    jpmEurexAccount: DA_Finance_Types.Account.decoder(),
  }),
})

export type Assets = {
  usd: DA_Finance_Types.Asset;
  eur: DA_Finance_Types.Asset;
  chf: DA_Finance_Types.Asset;
  csgn: DA_Finance_Types.Asset;
  ubsg: DA_Finance_Types.Asset;
  csgnCall: DA_Finance_Types.Asset;
  ubsgPut: DA_Finance_Types.Asset;
}
export const Assets: daml.Serializable<Assets> = ({
  decoder: () => jtv.object({
    usd: DA_Finance_Types.Asset.decoder(),
    eur: DA_Finance_Types.Asset.decoder(),
    chf: DA_Finance_Types.Asset.decoder(),
    csgn: DA_Finance_Types.Asset.decoder(),
    ubsg: DA_Finance_Types.Asset.decoder(),
    csgnCall: DA_Finance_Types.Asset.decoder(),
    ubsgPut: DA_Finance_Types.Asset.decoder(),
  }),
})

export type Parties = {
  fed: daml.Party;
  ecb: daml.Party;
  snb: daml.Party;
  eurex: daml.Party;
  six: daml.Party;
  jpm: daml.Party;
}
export const Parties: daml.Serializable<Parties> = ({
  decoder: () => jtv.object({
    fed: daml.Party.decoder(),
    ecb: daml.Party.decoder(),
    snb: daml.Party.decoder(),
    eurex: daml.Party.decoder(),
    six: daml.Party.decoder(),
    jpm: daml.Party.decoder(),
  }),
})
