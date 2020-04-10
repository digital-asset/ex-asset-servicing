// Generated from DA/Next/Set.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export type Set<a_aabb> = {
  textMap: { [key: string]: {} };
}
export const Set = <a_aabb>(a_aabb: daml.Serializable<a_aabb>): daml.Serializable<Set<a_aabb>> => ({
  decoder: () => jtv.object({
    textMap: daml.TextMap(daml.Unit).decoder(),
  }),
})
