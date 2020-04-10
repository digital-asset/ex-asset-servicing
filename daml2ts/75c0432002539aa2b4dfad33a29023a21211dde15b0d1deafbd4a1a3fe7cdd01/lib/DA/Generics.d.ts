import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';
export declare enum DecidedStrictness {
    DecidedLazy = "DecidedLazy",
    DecidedStrict = "DecidedStrict",
    DecidedUnpack = "DecidedUnpack"
}
export declare namespace DecidedStrictness {
    const decoder: () => jtv.Decoder<DecidedStrictness>;
}
export declare enum SourceStrictness {
    NoSourceStrictness = "NoSourceStrictness",
    SourceLazy = "SourceLazy",
    SourceStrict = "SourceStrict"
}
export declare namespace SourceStrictness {
    const decoder: () => jtv.Decoder<SourceStrictness>;
}
export declare enum SourceUnpackedness {
    NoSourceUnpackedness = "NoSourceUnpackedness",
    SourceNoUnpack = "SourceNoUnpack",
    SourceUnpack = "SourceUnpack"
}
export declare namespace SourceUnpackedness {
    const decoder: () => jtv.Decoder<SourceUnpackedness>;
}
export declare enum Associativity {
    LeftAssociative = "LeftAssociative",
    RightAssociative = "RightAssociative",
    NotAssociative = "NotAssociative"
}
export declare namespace Associativity {
    const decoder: () => jtv.Decoder<Associativity>;
}
export declare type Infix0 = {
    associativity: Associativity;
    fixity: daml.Int;
};
export declare const Infix0: daml.Serializable<Infix0>;
export declare type Fixity = {
    tag: 'Prefix';
    value: {};
} | {
    tag: 'Infix';
    value: Infix0;
};
export declare const Fixity: daml.Serializable<Fixity> & {};
export declare type K1<i_a2Fq, c_a2Fr, p_a2Fs> = {
    unK1: c_a2Fr;
};
export declare const K1: <i_a2Fq, c_a2Fr, p_a2Fs>(i_a2Fq: daml.Serializable<i_a2Fq>, c_a2Fr: daml.Serializable<c_a2Fr>, p_a2Fs: daml.Serializable<p_a2Fs>) => daml.Serializable<K1<i_a2Fq, c_a2Fr, p_a2Fs>>;
export declare type Par1<p_a2Fv> = {
    unPar1: p_a2Fv;
};
export declare const Par1: <p_a2Fv>(p_a2Fv: daml.Serializable<p_a2Fv>) => daml.Serializable<Par1<p_a2Fv>>;
export declare type U1<p_a2Fw> = {};
export declare const U1: <p_a2Fw>(p_a2Fw: daml.Serializable<p_a2Fw>) => daml.Serializable<U1<p_a2Fw>>;
