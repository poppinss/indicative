import { DataRoot, DataNode, FormatterContract, Validation } from '../Contracts/ValidationCompiler';
import { Message, ParsedRule } from 'indicative-parser';
export declare class ValidationRunner {
    private _validation;
    private _field;
    private _rule;
    private _message;
    private _type;
    private _dotPath;
    private _dotPathLength;
    constructor(_validation: Validation, _field: string, _rule: ParsedRule, _message: Message, _type: 'object' | 'literal' | 'array', _dotPath: string[]);
    private _reportError;
    private _runValidation;
    exec(data: DataNode, formatter: FormatterContract, root: DataRoot, config: unknown): boolean;
    execAsync(data: DataNode, formatter: FormatterContract, root: DataRoot, config: unknown): Promise<boolean>;
}
