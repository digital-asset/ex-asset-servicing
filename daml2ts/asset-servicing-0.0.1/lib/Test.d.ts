import * as daml from '@daml/types';
import * as Types from './/Types';
export declare type InstrumentSetup = {
    chf: Types.Id;
    csgn: Types.Id;
    ubsg: Types.Id;
    csgnCall: Types.Id;
    acbrc: Types.Id;
};
export declare const InstrumentSetup: daml.Serializable<InstrumentSetup>;
export declare type PartySetup = {
    pb: daml.Party;
    csd: daml.Party;
    ib: daml.Party;
};
export declare const PartySetup: daml.Serializable<PartySetup>;
