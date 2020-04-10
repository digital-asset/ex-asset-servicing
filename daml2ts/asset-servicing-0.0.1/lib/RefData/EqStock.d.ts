import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type EqStock = {
    instrumentId: Types.Id;
    ccy: Types.Id;
    obs: daml.Party[];
};
export declare const EqStock: daml.Template<EqStock, EqStock.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqStock:EqStock'> & {
    Archive: daml.Choice<EqStock, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EqStock.Key>;
};
export declare namespace EqStock {
    type Key = Types.Id;
}
