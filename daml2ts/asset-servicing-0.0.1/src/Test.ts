// Generated from Test.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from './/Types';

export type InstrumentSetup = {
  chf: Types.Id;
  csgn: Types.Id;
  ubsg: Types.Id;
  csgnCall: Types.Id;
  acbrc: Types.Id;
}
export const InstrumentSetup: daml.Serializable<InstrumentSetup> = ({
  decoder: () => jtv.object({
    chf: Types.Id.decoder(),
    csgn: Types.Id.decoder(),
    ubsg: Types.Id.decoder(),
    csgnCall: Types.Id.decoder(),
    acbrc: Types.Id.decoder(),
  }),
})

export type PartySetup = {
  pb: daml.Party;
  csd: daml.Party;
  ib: daml.Party;
}
export const PartySetup: daml.Serializable<PartySetup> = ({
  decoder: () => jtv.object({
    pb: daml.Party.decoder(),
    csd: daml.Party.decoder(),
    ib: daml.Party.decoder(),
  }),
})
