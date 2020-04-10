import * as jtv from '@mojotech/json-type-validation';
import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type EqOption = {
    instrumentId: Types.Id;
    underlying: Types.Id;
    optionType: OptionType;
    strike: daml.Numeric;
    contractSize: daml.Numeric;
    maturity: daml.Date;
    obs: daml.Party[];
};
export declare const EqOption: daml.Template<EqOption, EqOption.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqOption:EqOption'> & {
    Archive: daml.Choice<EqOption, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EqOption.Key>;
};
export declare namespace EqOption {
    type Key = Types.Id;
}
export declare enum OptionType {
    Put = "Put",
    Call = "Call"
}
export declare namespace OptionType {
    const decoder: () => jtv.Decoder<OptionType>;
}
