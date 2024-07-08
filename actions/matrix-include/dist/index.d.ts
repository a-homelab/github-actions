type Inputs = {
    matrix: [string];
    includeFile: string;
};
export declare const assertInputs: (input: unknown) => Inputs;
type MatrixConfig = {
    matrix: [
        {
            key: string;
            include: [Map<string, unknown>];
        }
    ];
};
export declare const assertMatrixConfig: (input: unknown) => MatrixConfig;
/**
 * The main function for the action.
 */
export declare function main(): Promise<void>;
export {};
