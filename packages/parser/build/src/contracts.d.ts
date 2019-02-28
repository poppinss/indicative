export declare type ParsedRule = {
    name: string;
    args: any[];
};
export declare type SchemaNodeArray = {
    type: 'array';
    rules: ParsedRule[];
    each: {
        [index: string]: {
            rules: ParsedRule[];
            children: ParsedSchema;
        };
    };
};
export declare type SchemaNodeObject = {
    type: 'object';
    rules: ParsedRule[];
    children: ParsedSchema;
};
export declare type SchemaNodeLiteral = {
    type: 'literal';
    rules: ParsedRule[];
};
export declare type Schema = {
    [field: string]: string | ParsedRule[];
};
export declare type ParsedSchema = {
    [field: string]: SchemaNodeArray | SchemaNodeLiteral | SchemaNodeObject;
};
export declare type Message = string | ((field: string, validation: string, args: any[]) => string);
export declare type Messages = {
    [field: string]: Message;
};
export declare type ParsedRulesMessages = {
    [rule: string]: Message;
};
export declare type ParsedFieldsMessages = {
    [field: string]: ParsedRulesMessages;
};
export declare type ParsedMessages = {
    fields: ParsedFieldsMessages;
    rules: ParsedRulesMessages;
};
