import * as daml from '@daml/types';
export declare type Map<k_a9we, v_a9wf> = {
    textMap: {
        [key: string]: v_a9wf;
    };
};
export declare const Map: <k_a9we, v_a9wf>(k_a9we: daml.Serializable<k_a9we>, v_a9wf: daml.Serializable<v_a9wf>) => daml.Serializable<Map<k_a9we, v_a9wf>>;
