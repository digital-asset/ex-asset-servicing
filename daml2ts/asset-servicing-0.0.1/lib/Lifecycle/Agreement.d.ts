import * as daml from '@daml/types';
import * as Lifecycle_Position from '..//Lifecycle/Position';
import * as Types from '..//Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type Decline = {};
export declare const Decline: daml.Serializable<Decline>;
export declare type LifecycleAgreement_Accept = {};
export declare const LifecycleAgreement_Accept: daml.Serializable<LifecycleAgreement_Accept>;
export declare type LifecycleAgreementRequest = {
    instrumentHost: daml.Party;
    positionHost: daml.Party;
};
export declare const LifecycleAgreementRequest: daml.Template<LifecycleAgreementRequest, undefined, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreementRequest'> & {
    LifecycleAgreement_Accept: daml.Choice<LifecycleAgreementRequest, LifecycleAgreement_Accept, daml.ContractId<LifecycleAgreement>, undefined>;
    Archive: daml.Choice<LifecycleAgreementRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, undefined>;
    Decline: daml.Choice<LifecycleAgreementRequest, Decline, {}, undefined>;
};
export declare type LifecyclePosition_Create = {
    instrumentId: Types.Id;
    outcome: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<Types.Id, daml.Numeric>[];
};
export declare const LifecyclePosition_Create: daml.Serializable<LifecyclePosition_Create>;
export declare type LifecycleAgreement = {
    instrumentHost: daml.Party;
    positionHost: daml.Party;
};
export declare const LifecycleAgreement: daml.Template<LifecycleAgreement, LifecycleAgreement.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Agreement:LifecycleAgreement'> & {
    LifecyclePosition_Create: daml.Choice<LifecycleAgreement, LifecyclePosition_Create, daml.ContractId<Lifecycle_Position.LifecyclePosition>, LifecycleAgreement.Key>;
    Archive: daml.Choice<LifecycleAgreement, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, LifecycleAgreement.Key>;
};
export declare namespace LifecycleAgreement {
    type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.Party, daml.Party>;
}
