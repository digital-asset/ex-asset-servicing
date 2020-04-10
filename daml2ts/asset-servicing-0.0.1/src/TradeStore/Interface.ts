// Generated from TradeStore/Interface.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Book = {
  positionId: Types.PositionId;
  quantity: daml.Numeric;
}
export const Book: daml.Serializable<Book> = ({
  decoder: () => jtv.object({
    positionId: Types.PositionId.decoder(),
    quantity: daml.Numeric(10).decoder(),
  }),
})

export type Interface = {
  host: daml.Party;
  nextId: daml.Int;
}
export const Interface: daml.Template<Interface, Interface.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:TradeStore.Interface:Interface'> & {
  Archive: daml.Choice<Interface, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, Interface.Key>;
  Book: daml.Choice<Interface, Book, {}, Interface.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:TradeStore.Interface:Interface',
  keyDecoder: () => daml.Party.decoder(),
  decoder: () => jtv.object({
    host: daml.Party.decoder(),
    nextId: daml.Int.decoder(),
  }),
  Archive: {
    template: () => Interface,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  Book: {
    template: () => Interface,
    choiceName: 'Book',
    argumentDecoder: Book.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Interface {
  export type Key = daml.Party
}
daml.registerTemplate(Interface);
