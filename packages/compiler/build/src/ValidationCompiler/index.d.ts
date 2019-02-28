import { Schema, Messages } from 'indicative-parser';
import { Validations, TopLevelRunner } from '../Contracts/ValidationCompiler';
export declare function validationCompiler(schema: Schema, validations: Validations, messages: Messages): TopLevelRunner;
