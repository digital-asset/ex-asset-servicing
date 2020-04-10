import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type Position = {
    positionId: Types.PositionId;
    quantity: daml.Numeric;
};
export declare const Position: daml.Template<Position, Position.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:TradeStore.Position:Position'> & {
    Archive: daml.Choice<Position, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, Position.Key>;
};
export declare namespace Position {
    type Key = Types.PositionId;
}
