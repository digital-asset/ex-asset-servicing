// Generated from Daml/Script.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export type LedgerValue = {
}
export const LedgerValue: daml.Serializable<LedgerValue> = ({
  decoder: () => jtv.object({
  }),
})

export type SubmitFailure = {
  status: daml.Int;
  description: string;
}
export const SubmitFailure: daml.Serializable<SubmitFailure> = ({
  decoder: () => jtv.object({
    status: daml.Int.decoder(),
    description: daml.Text.decoder(),
  }),
})

export type ParticipantName = {
  participantName: string;
}
export const ParticipantName: daml.Serializable<ParticipantName> = ({
  decoder: () => jtv.object({
    participantName: daml.Text.decoder(),
  }),
})

export type PartyIdHint = {
  partyIdHint: string;
}
export const PartyIdHint: daml.Serializable<PartyIdHint> = ({
  decoder: () => jtv.object({
    partyIdHint: daml.Text.decoder(),
  }),
})
