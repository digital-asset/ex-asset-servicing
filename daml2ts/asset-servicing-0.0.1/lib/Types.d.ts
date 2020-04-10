import * as daml from '@daml/types';
export declare type PositionId = {
    host: daml.Party;
    instrumentId: Id;
    book: string;
    counterParty: string;
};
export declare const PositionId: daml.Serializable<PositionId>;
export declare type Id = {
    host: daml.Party;
    label: string;
    version: daml.Int;
};
export declare const Id: daml.Serializable<Id>;
