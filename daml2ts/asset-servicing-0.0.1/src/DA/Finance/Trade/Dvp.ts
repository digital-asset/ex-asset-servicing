// Generated from DA/Finance/Trade/Dvp.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Trade_Types from '../../..//DA/Finance/Trade/Types';
import * as DA_Finance_Types from '../../..//DA/Finance/Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type Dvp = {
  masterAgreement: DA_Finance_Types.MasterAgreement;
  tradeId: DA_Finance_Types.Id;
  buyer: daml.Party;
  status: DA_Finance_Trade_Types.SettlementStatus;
  settlementDate: daml.Optional<daml.Date>;
  payments: DA_Finance_Types.Asset[];
  deliveries: DA_Finance_Types.Asset[];
  observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const Dvp: daml.Template<Dvp, Dvp.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp:Dvp'> & {
  Archive: daml.Choice<Dvp, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, Dvp.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Trade.Dvp:Dvp',
  keyDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(DA_Finance_Types.Id, DA_Finance_Types.Id).decoder(),
  decoder: () => jtv.object({
    masterAgreement: DA_Finance_Types.MasterAgreement.decoder(),
    tradeId: DA_Finance_Types.Id.decoder(),
    buyer: daml.Party.decoder(),
    status: DA_Finance_Trade_Types.SettlementStatus.decoder(),
    settlementDate: daml.Optional(daml.Date).decoder(),
    payments: daml.List(DA_Finance_Types.Asset).decoder(),
    deliveries: daml.List(DA_Finance_Types.Asset).decoder(),
    observers: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => Dvp,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Dvp {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<DA_Finance_Types.Id, DA_Finance_Types.Id>
}
daml.registerTemplate(Dvp);
