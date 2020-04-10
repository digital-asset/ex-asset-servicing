import * as jtv from '@mojotech/json-type-validation';
export declare enum DayOfWeek {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}
export declare namespace DayOfWeek {
    const decoder: () => jtv.Decoder<DayOfWeek>;
}
export declare enum Month {
    Jan = "Jan",
    Feb = "Feb",
    Mar = "Mar",
    Apr = "Apr",
    May = "May",
    Jun = "Jun",
    Jul = "Jul",
    Aug = "Aug",
    Sep = "Sep",
    Oct = "Oct",
    Nov = "Nov",
    Dec = "Dec"
}
export declare namespace Month {
    const decoder: () => jtv.Decoder<Month>;
}
