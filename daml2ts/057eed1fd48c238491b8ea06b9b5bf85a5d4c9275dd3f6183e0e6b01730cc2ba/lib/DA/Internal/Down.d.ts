import * as daml from '@daml/types';
export declare type Down<a> = {
    unpack: a;
};
export declare const Down: <a>(a: daml.Serializable<a>) => daml.Serializable<Down<a>>;
