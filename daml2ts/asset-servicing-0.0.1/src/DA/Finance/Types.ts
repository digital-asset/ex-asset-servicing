// Generated from DA/Finance/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';

export type MasterAgreement = {
  id: Id;
  party1: daml.Party;
  party2: daml.Party;
}
export const MasterAgreement: daml.Serializable<MasterAgreement> = ({
  decoder: () => jtv.object({
    id: Id.decoder(),
    party1: daml.Party.decoder(),
    party2: daml.Party.decoder(),
  }),
})

export type Asset = {
  id: Id;
  quantity: daml.Numeric;
}
export const Asset: daml.Serializable<Asset> = ({
  decoder: () => jtv.object({
    id: Id.decoder(),
    quantity: daml.Numeric(10).decoder(),
  }),
})

export type Account = {
  id: Id;
  provider: daml.Party;
  owner: daml.Party;
}
export const Account: daml.Serializable<Account> = ({
  decoder: () => jtv.object({
    id: Id.decoder(),
    provider: daml.Party.decoder(),
    owner: daml.Party.decoder(),
  }),
})

export type Id = {
  signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
  label: string;
  version: daml.Int;
}
export const Id: daml.Serializable<Id> = ({
  decoder: () => jtv.object({
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
    label: daml.Text.decoder(),
    version: daml.Int.decoder(),
  }),
})
