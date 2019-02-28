import { Message, ParsedRule, ParsedMessages } from 'indicative-parser';
import { DataRoot, FormatterContract } from './Contracts/ValidationCompiler';
export declare function dotProp(value: any, paths: string[], pathsSize: number): any;
export declare function defaultMessage(field: string, validation: string): string;
export declare function reportError(formatter: FormatterContract, field: string, rule: ParsedRule, message: Message | Error, dotPath: string[], root: DataRoot): void;
export declare function isObject(data: any): boolean;
export declare function isArray(data: any): boolean;
export declare function getItemsForIndex(collection: any[], index: string): any[];
export declare function getMessageFromPath({ fields: fieldsMessages, rules: rulesMessages }: ParsedMessages, field: string, rule: ParsedRule, basePath: string[]): Message;
