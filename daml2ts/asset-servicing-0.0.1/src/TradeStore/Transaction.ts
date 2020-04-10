// Generated from TradeStore/Transaction.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Transaction = {
  transactionId: Types.Id;
  positionId: Types.PositionId;
  quantity: daml.Numeric;
}
export const Transaction: daml.Template<Transaction, Transaction.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:TradeStore.Transaction:Transaction'> & {
  Archive: daml.Choice<Transaction, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, Transaction.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:TradeStore.Transaction:Transaction',
  keyDecoder: () => Types.Id.decoder(),
  decoder: () => jtv.object({
    transactionId: Types.Id.decoder(),
    positionId: Types.PositionId.decoder(),
    quantity: daml.Numeric(10).decoder(),
  }),
  Archive: {
    template: () => Transaction,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Transaction {
  export type Key = Types.Id
}
daml.registerTemplate(Transaction);
