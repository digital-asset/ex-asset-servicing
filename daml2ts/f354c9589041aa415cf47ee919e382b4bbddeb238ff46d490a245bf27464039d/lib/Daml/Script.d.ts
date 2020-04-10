import * as daml from '@daml/types';
export declare type LedgerValue = {};
export declare const LedgerValue: daml.Serializable<LedgerValue>;
export declare type SubmitFailure = {
    status: daml.Int;
    description: string;
};
export declare const SubmitFailure: daml.Serializable<SubmitFailure>;
export declare type ParticipantName = {
    participantName: string;
};
export declare const ParticipantName: daml.Serializable<ParticipantName>;
export declare type PartyIdHint = {
    partyIdHint: string;
};
export declare const PartyIdHint: daml.Serializable<PartyIdHint>;
