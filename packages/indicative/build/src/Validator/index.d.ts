import { DataNode, Schema, Messages } from 'indicative-compiler';
import { ValidationOptions } from '../Contracts';
export declare class Validator {
    private _cacheManager;
    private _getRunner;
    validate<Data extends DataNode>(data: Data, rules: Schema, messages: Messages, options?: Partial<ValidationOptions>): Promise<Data>;
    validateAll<Data extends DataNode>(data: Data, rules: Schema, messages: Messages, options?: Partial<ValidationOptions>): Promise<Data>;
}
