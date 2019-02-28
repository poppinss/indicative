import { DataNode, DataRoot, FormatterContract } from '../src/Contracts/ValidationCompiler';
declare type VanillaError = {
    message: string;
    field: string;
    validation: string;
};
export declare function validationThatFails(_data: DataNode, _field: string, _args: any[]): boolean;
export declare function asyncValidationThatFails(_data: DataNode, _field: string, _args: any[]): Promise<boolean>;
export declare class Stack {
    stack: {
        data: DataNode;
        field: string;
        args: any[];
        type: string;
        root: DataRoot;
    }[];
    fn(data: DataNode, field: string, args: any[], type: string, root: DataRoot): boolean;
    asyncFn(data: DataNode, field: string, args: any[], type: string, root: DataRoot): Promise<boolean>;
}
export declare function getValidations(list: string[], fn: any): {};
export declare function getAsyncValidations(list: string[], fn: any): {};
export declare class VanillaFormatter implements FormatterContract {
    errors: VanillaError[];
    addError(error: Error | string, field: string, validation: string, _args: any[]): void;
    toJSON(): VanillaError[] | null;
}
export {};
