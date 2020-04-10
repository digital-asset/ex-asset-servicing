import * as daml from '@daml/types';
import * as DA_Finance_Types from './/DA/Finance/Types';
export declare type Accounts = {
    jpmSnbAccount: DA_Finance_Types.Account;
    jpmSixAccount: DA_Finance_Types.Account;
    jpmEurexAccount: DA_Finance_Types.Account;
};
export declare const Accounts: daml.Serializable<Accounts>;
export declare type Assets = {
    usd: DA_Finance_Types.Asset;
    eur: DA_Finance_Types.Asset;
    chf: DA_Finance_Types.Asset;
    csgn: DA_Finance_Types.Asset;
    ubsg: DA_Finance_Types.Asset;
    csgnCall: DA_Finance_Types.Asset;
    ubsgPut: DA_Finance_Types.Asset;
};
export declare const Assets: daml.Serializable<Assets>;
export declare type Parties = {
    fed: daml.Party;
    ecb: daml.Party;
    snb: daml.Party;
    eurex: daml.Party;
    six: daml.Party;
    jpm: daml.Party;
};
export declare const Parties: daml.Serializable<Parties>;
