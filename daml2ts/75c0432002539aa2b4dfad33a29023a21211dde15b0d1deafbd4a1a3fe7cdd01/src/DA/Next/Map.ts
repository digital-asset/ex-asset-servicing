// Generated from DA/Next/Map.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export type Map<k_a9we, v_a9wf> = {
  textMap: { [key: string]: v_a9wf };
}
export const Map = <k_a9we, v_a9wf>(k_a9we: daml.Serializable<k_a9we>, v_a9wf: daml.Serializable<v_a9wf>): daml.Serializable<Map<k_a9we, v_a9wf>> => ({
  decoder: () => jtv.object({
    textMap: daml.TextMap(v_a9wf).decoder(),
  }),
})
