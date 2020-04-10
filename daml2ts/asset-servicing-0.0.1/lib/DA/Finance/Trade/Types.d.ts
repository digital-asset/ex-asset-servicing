import * as jtv from '@mojotech/json-type-validation';
export declare enum SettlementStatus {
    SettlementStatus_Pending = "SettlementStatus_Pending",
    SettlementStatus_Instructed = "SettlementStatus_Instructed",
    SettlementStatus_Settled = "SettlementStatus_Settled"
}
export declare namespace SettlementStatus {
    const decoder: () => jtv.Decoder<SettlementStatus>;
}
