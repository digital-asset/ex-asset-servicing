import * as daml from '@daml/types';
export declare type Set<a_aabb> = {
    textMap: {
        [key: string]: {};
    };
};
export declare const Set: <a_aabb>(a_aabb: daml.Serializable<a_aabb>) => daml.Serializable<Set<a_aabb>>;
