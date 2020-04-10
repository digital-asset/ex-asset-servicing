import * as daml from '@daml/types';
export declare type All = {
    getAll: boolean;
};
export declare const All: daml.Serializable<All>;
export declare type Any = {
    getAny: boolean;
};
export declare const Any: daml.Serializable<Any>;
export declare type Sum<a> = {
    unpack: a;
};
export declare const Sum: <a>(a: daml.Serializable<a>) => daml.Serializable<Sum<a>>;
export declare type Product<a> = {
    unpack: a;
};
export declare const Product: <a>(a: daml.Serializable<a>) => daml.Serializable<Product<a>>;
