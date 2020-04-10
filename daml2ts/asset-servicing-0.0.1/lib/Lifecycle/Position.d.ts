import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types from '@daml2ts/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type Lifecycle = {
    positionId: Types.PositionId;
};
export declare const Lifecycle: daml.Serializable<Lifecycle>;
export declare type LifecyclePosition = {
    positionHost: daml.Party;
    instrumentId: Types.Id;
    outcome: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<Types.Id, daml.Numeric>[];
};
export declare const LifecyclePosition: daml.Template<LifecyclePosition, LifecyclePosition.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.Position:LifecyclePosition'> & {
    Archive: daml.Choice<LifecyclePosition, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, LifecyclePosition.Key>;
    Lifecycle: daml.Choice<LifecyclePosition, Lifecycle, {}, LifecyclePosition.Key>;
};
export declare namespace LifecyclePosition {
    type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7_DA_Types.Tuple2<daml.Party, Types.Id>;
}
