import { DataRoot, DataNode, FormatterContract, ValidationExecutor } from '../Contracts/ValidationCompiler';
export declare class ArrayRunner {
    private _executors;
    private _dotPath;
    private _index;
    private _dotPathLength;
    constructor(_executors: ValidationExecutor[], _dotPath: string[], _index: string);
    private _getRoot;
    private _updateIndexes;
    private _runExecutors;
    private _runAsyncExecutors;
    exec(data: DataNode, formatter: FormatterContract, baseRoot: DataRoot, config: unknown, bail: boolean): boolean;
    execAsync(data: DataNode, formatter: FormatterContract, baseRoot: DataRoot, config: unknown, bail: boolean): Promise<boolean>;
}
