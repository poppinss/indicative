import { ParsedMessages } from 'indicative-parser';
export declare type DataNode = {
    [field: string]: any;
};
export declare type DataRoot = {
    original: DataNode;
    parentArray?: any[];
    arrayIndexes?: number[];
    currentIndex?: number;
    arrayPaths?: string[][];
};
export interface FormatterContract {
    errors: unknown[];
    addError(error: string | Error, field: string, rule: string, args: string[]): void;
    toJSON(): unknown;
}
export declare type ValidationExecutor = {
    async: boolean;
    fn: ((data: DataNode, formatter: FormatterContract, root: DataRoot, config: unknown, bail: boolean) => Promise<boolean> | boolean);
};
export declare type NodeConsumerArgs = [Validations, ParsedMessages];
export declare type Validation = {
    async: boolean;
    compile?: (args: any[]) => any[];
    validate: ((data: DataNode, field: string, args: any[], type: 'object' | 'literal' | 'array', root: DataRoot, config: unknown) => boolean | Promise<boolean>);
};
export declare type Validations = {
    [field: string]: Validation;
};
export declare type TopLevelRunner = (<Data extends DataNode>(data: Data, formatter: FormatterContract, config: unknown, bail?: boolean) => Promise<Data>);
