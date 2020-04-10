import * as jtv from '@mojotech/json-type-validation';
export declare enum Ordering {
    LT = "LT",
    EQ = "EQ",
    GT = "GT"
}
export declare namespace Ordering {
    const decoder: () => jtv.Decoder<Ordering>;
}
