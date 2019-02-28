import { ParsedRule } from 'indicative-parser';
export declare type NodeConsumer<NodeArgs extends any[], Output extends any> = ((rule: ParsedRule, field: string, type: 'object' | 'literal' | 'array', executorArgs: NodeArgs, dotPath: string[], resetPaths: string[]) => Output);
export declare type ArrayChildWrapper<Output extends any> = ((child: Output[], dotPath: string[], index: string) => Output);
