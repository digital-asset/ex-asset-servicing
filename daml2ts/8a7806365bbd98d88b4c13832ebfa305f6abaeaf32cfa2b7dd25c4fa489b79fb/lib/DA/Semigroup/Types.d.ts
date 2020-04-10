import * as daml from '@daml/types';
export declare type Min<a> = {
    unpack: a;
};
export declare const Min: <a>(a: daml.Serializable<a>) => daml.Serializable<Min<a>>;
export declare type Max<a> = {
    unpack: a;
};
export declare const Max: <a>(a: daml.Serializable<a>) => daml.Serializable<Max<a>>;
