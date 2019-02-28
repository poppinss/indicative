import { ValidationOptions } from './src/Contracts';
import { DataNode, Schema, Messages } from 'indicative-compiler';
export declare function validate<Data extends DataNode>(data: Data, rules: Schema, messages?: Messages, options?: Partial<ValidationOptions>): Promise<Data>;
export declare function validateAll<Data extends DataNode>(data: Data, rules: Schema, messages?: Messages, options?: Partial<ValidationOptions>): Promise<Data>;
