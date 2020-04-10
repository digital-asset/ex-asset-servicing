// Generated from Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export type PositionId = {
  host: daml.Party;
  instrumentId: Id;
  book: string;
  counterParty: string;
}
export const PositionId: daml.Serializable<PositionId> = ({
  decoder: () => jtv.object({
    host: daml.Party.decoder(),
    instrumentId: Id.decoder(),
    book: daml.Text.decoder(),
    counterParty: daml.Text.decoder(),
  }),
})

export type Id = {
  host: daml.Party;
  label: string;
  version: daml.Int;
}
export const Id: daml.Serializable<Id> = ({
  decoder: () => jtv.object({
    host: daml.Party.decoder(),
    label: daml.Text.decoder(),
    version: daml.Int.decoder(),
  }),
})
