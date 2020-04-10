import * as daml from '@daml/types';
export declare type NonEmpty<a> = {
    hd: a;
    tl: a[];
};
export declare const NonEmpty: <a>(a: daml.Serializable<a>) => daml.Serializable<NonEmpty<a>>;
