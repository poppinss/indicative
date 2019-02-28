export declare type CalcKeys = 'years' | 'quarters' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
export declare type ArgComparison = [number];
export declare type ArgComparisonDate = [Date | string | number];
export declare type ArgOffset = [number, CalcKeys];
export declare type ArgMinMax = [number, number];
export declare type ArgRegex = [RegExp];
export declare type RulesConfig = {
    existyStrict: boolean;
};
