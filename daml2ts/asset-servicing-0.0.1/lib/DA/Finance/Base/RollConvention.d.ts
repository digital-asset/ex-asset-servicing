import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';
export declare type RollConventionEnum = {
    tag: 'EOM';
    value: {};
} | {
    tag: 'DOM';
    value: daml.Int;
};
export declare const RollConventionEnum: daml.Serializable<RollConventionEnum> & {};
export declare enum PeriodEnum {
    D = "D",
    M = "M",
    W = "W",
    Y = "Y"
}
export declare namespace PeriodEnum {
    const decoder: () => jtv.Decoder<PeriodEnum>;
}
export declare type Period = {
    period: PeriodEnum;
    periodMultiplier: daml.Int;
};
export declare const Period: daml.Serializable<Period>;
