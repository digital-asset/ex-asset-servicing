import * as daml from '@daml/types';
export declare type Formula<a> = {
    tag: 'Proposition';
    value: a;
} | {
    tag: 'Negation';
    value: Formula<a>;
} | {
    tag: 'Conjunction';
    value: Formula<a>[];
} | {
    tag: 'Disjunction';
    value: Formula<a>[];
};
export declare const Formula: <a>(a: daml.Serializable<a>) => daml.Serializable<Formula<a>>;
