import { FormatterContract } from 'indicative-compiler';
export declare type VanillaErrorNode = {
    error: string;
    validation: string;
    field: string;
};
export declare class VanillaFormatter implements FormatterContract {
    errors: VanillaErrorNode[];
    addError(error: Error | string, field: string, rule: string): void;
    toJSON(): VanillaErrorNode[] | null;
}
