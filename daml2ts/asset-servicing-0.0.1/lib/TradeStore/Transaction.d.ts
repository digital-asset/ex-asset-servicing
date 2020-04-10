import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type Transaction = {
    transactionId: Types.Id;
    positionId: Types.PositionId;
    quantity: daml.Numeric;
};
export declare const Transaction: daml.Template<Transaction, Transaction.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:TradeStore.Transaction:Transaction'> & {
    Archive: daml.Choice<Transaction, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, Transaction.Key>;
};
export declare namespace Transaction {
    type Key = Types.Id;
}
