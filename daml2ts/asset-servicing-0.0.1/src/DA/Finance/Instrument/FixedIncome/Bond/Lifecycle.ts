// Generated from DA/Finance/Instrument/FixedIncome/Bond/Lifecycle.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';

import * as DA_Finance_Asset_Lifecycle from '../../../../..//DA/Finance/Asset/Lifecycle';
import * as DA_Finance_Instrument_FixedIncome_Bond from '../../../../..//DA/Finance/Instrument/FixedIncome/Bond';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set from '@daml2ts/75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01/lib/DA/Next/Set';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export type BondCoupon_Lifecycle = {
  bondCid: daml.ContractId<DA_Finance_Instrument_FixedIncome_Bond.Bond>;
}
export const BondCoupon_Lifecycle: daml.Serializable<BondCoupon_Lifecycle> = ({
  decoder: () => jtv.object({
    bondCid: daml.ContractId(DA_Finance_Instrument_FixedIncome_Bond.Bond).decoder(),
  }),
})

export type BondCouponRule = {
  signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>;
}
export const BondCouponRule: daml.Template<BondCouponRule, BondCouponRule.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.FixedIncome.Bond.Lifecycle:BondCouponRule'> & {
  Archive: daml.Choice<BondCouponRule, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, BondCouponRule.Key>;
  BondCoupon_Lifecycle: daml.Choice<BondCouponRule, BondCoupon_Lifecycle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.ContractId<DA_Finance_Instrument_FixedIncome_Bond.Bond>, daml.ContractId<DA_Finance_Asset_Lifecycle.LifecycleEffects>>, BondCouponRule.Key>;
} = {
  templateId: '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:DA.Finance.Instrument.FixedIncome.Bond.Lifecycle:BondCouponRule',
  keyDecoder: () => pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  decoder: () => jtv.object({
    signatories: pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set(daml.Party).decoder(),
  }),
  Archive: {
    template: () => BondCouponRule,
    choiceName: 'Archive',
    argumentDecoder: pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive.decoder,
    resultDecoder: () => daml.Unit.decoder(),
  },
  BondCoupon_Lifecycle: {
    template: () => BondCouponRule,
    choiceName: 'BondCoupon_Lifecycle',
    argumentDecoder: BondCoupon_Lifecycle.decoder,
    resultDecoder: () => pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2(daml.ContractId(DA_Finance_Instrument_FixedIncome_Bond.Bond), daml.ContractId(DA_Finance_Asset_Lifecycle.LifecycleEffects)).decoder(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BondCouponRule {
  export type Key = pkg75c0432002539aa2b4dfad33a29023a21211dde15b0d1deafbd4a1a3fe7cdd01_DA_Next_Set.Set<daml.Party>
}
daml.registerTemplate(BondCouponRule);
