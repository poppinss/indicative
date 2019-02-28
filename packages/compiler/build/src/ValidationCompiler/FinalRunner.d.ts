import { ValidationExecutor, FormatterContract, DataNode } from '../Contracts/ValidationCompiler';
export declare class FinalRunner {
    private _stack;
    constructor(_stack: ValidationExecutor[]);
    exec(data: DataNode, formatter: FormatterContract, config: unknown, bail?: boolean): Promise<DataNode>;
}
