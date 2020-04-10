// Generated from DA/Finance/Trade/Types.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

export enum SettlementStatus {
  SettlementStatus_Pending = 'SettlementStatus_Pending',
  SettlementStatus_Instructed = 'SettlementStatus_Instructed',
  SettlementStatus_Settled = 'SettlementStatus_Settled',
}
daml.STATIC_IMPLEMENTS_SERIALIZABLE_CHECK<SettlementStatus>(SettlementStatus)
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SettlementStatus {
  export const decoder = () => jtv.oneOf<SettlementStatus>(
    jtv.constant(SettlementStatus.SettlementStatus_Pending),
    jtv.constant(SettlementStatus.SettlementStatus_Instructed),
    jtv.constant(SettlementStatus.SettlementStatus_Settled),
  );
}
