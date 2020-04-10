// Generated from DA/Generics.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export enum DecidedStrictness {
  DecidedLazy = 'DecidedLazy',
  DecidedStrict = 'DecidedStrict',
  DecidedUnpack = 'DecidedUnpack',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<DecidedStrictness>(DecidedStrictness)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DecidedStrictness {
  export const decoder = () => jtv.oneOf<DecidedStrictness>(
    jtv.constant(DecidedStrictness.DecidedLazy),
    jtv.constant(DecidedStrictness.DecidedStrict),
    jtv.constant(DecidedStrictness.DecidedUnpack),
  );
}

export enum SourceStrictness {
  NoSourceStrictness = 'NoSourceStrictness',
  SourceLazy = 'SourceLazy',
  SourceStrict = 'SourceStrict',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<SourceStrictness>(SourceStrictness)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SourceStrictness {
  export const decoder = () => jtv.oneOf<SourceStrictness>(
    jtv.constant(SourceStrictness.NoSourceStrictness),
    jtv.constant(SourceStrictness.SourceLazy),
    jtv.constant(SourceStrictness.SourceStrict),
  );
}

export enum SourceUnpackedness {
  NoSourceUnpackedness = 'NoSourceUnpackedness',
  SourceNoUnpack = 'SourceNoUnpack',
  SourceUnpack = 'SourceUnpack',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<SourceUnpackedness>(SourceUnpackedness)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SourceUnpackedness {
  export const decoder = () => jtv.oneOf<SourceUnpackedness>(
    jtv.constant(SourceUnpackedness.NoSourceUnpackedness),
    jtv.constant(SourceUnpackedness.SourceNoUnpack),
    jtv.constant(SourceUnpackedness.SourceUnpack),
  );
}

export enum Associativity {
  LeftAssociative = 'LeftAssociative',
  RightAssociative = 'RightAssociative',
  NotAssociative = 'NotAssociative',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<Associativity>(Associativity)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Associativity {
  export const decoder = () => jtv.oneOf<Associativity>(
    jtv.constant(Associativity.LeftAssociative),
    jtv.constant(Associativity.RightAssociative),
    jtv.constant(Associativity.NotAssociative),
  );
}

export type Infix0 = {
  associativity: Associativity;
  fixity: daml.Int;
}
export const Infix0: daml.Serializable<Infix0> = ({
  decoder: () => jtv.object({
    associativity: Associativity.decoder(),
    fixity: daml.Int.decoder(),
  }),
})

export type Fixity = 
  |  { tag: 'Prefix'; value: {} }
  |  { tag: 'Infix'; value: Infix0 }
export const Fixity:
  daml.Serializable<Fixity> & {
  } = ({
  decoder: () => jtv.oneOf<Fixity>(
    jtv.object({tag: jtv.constant('Prefix'), value: jtv.lazy(() => daml.Unit.decoder())}),
    jtv.object({tag: jtv.constant('Infix'), value: jtv.lazy(() => Infix0.decoder())}),
  ),
});
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<Fixity>(Fixity)

export type K1<i_a2Fq, c_a2Fr, p_a2Fs> = {
  unK1: c_a2Fr;
}
export const K1 = <i_a2Fq, c_a2Fr, p_a2Fs>(i_a2Fq: daml.Serializable<i_a2Fq>, c_a2Fr: daml.Serializable<c_a2Fr>, p_a2Fs: daml.Serializable<p_a2Fs>): daml.Serializable<K1<i_a2Fq, c_a2Fr, p_a2Fs>> => ({
  decoder: () => jtv.object({
    unK1: c_a2Fr.decoder(),
  }),
})

export type Par1<p_a2Fv> = {
  unPar1: p_a2Fv;
}
export const Par1 = <p_a2Fv>(p_a2Fv: daml.Serializable<p_a2Fv>): daml.Serializable<Par1<p_a2Fv>> => ({
  decoder: () => jtv.object({
    unPar1: p_a2Fv.decoder(),
  }),
})

export type U1<p_a2Fw> = {
}
export const U1 = <p_a2Fw>(p_a2Fw: daml.Serializable<p_a2Fw>): daml.Serializable<U1<p_a2Fw>> => ({
  decoder: () => jtv.object({
  }),
})
