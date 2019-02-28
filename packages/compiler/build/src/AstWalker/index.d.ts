import { ParsedSchema } from 'indicative-parser';
import { NodeConsumer, ArrayChildWrapper } from '../Contracts/AstWalker';
export declare function astWalker<Output extends any, NodeArgs extends any[]>(tree: ParsedSchema, nodeArgs: NodeArgs, nodeConsumer: NodeConsumer<NodeArgs, Output>, arrayChildWrapper: ArrayChildWrapper<Output>, nodePath?: string[], resetPaths?: string[]): Output[];
