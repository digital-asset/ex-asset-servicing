import * as daml from '@daml/types';
export declare type Unit<a> = {
    _1: a;
};
export declare const Unit: <a>(a: daml.Serializable<a>) => daml.Serializable<Unit<a>>;
