import * as daml from '@daml/types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
export declare type MasterAgreement = {
    id: Id;
    party1: daml.Party;
    party2: daml.Party;
};
export declare const MasterAgreement: daml.Serializable<MasterAgreement>;
export declare type Asset = {
    id: Id;
    quantity: daml.Numeric;
};
export declare const Asset: daml.Serializable<Asset>;
export declare type Account = {
    id: Id;
    provider: daml.Party;
    owner: daml.Party;
};
export declare const Account: daml.Serializable<Account>;
export declare type Id = {
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
    label: string;
    version: daml.Int;
};
export declare const Id: daml.Serializable<Id>;
