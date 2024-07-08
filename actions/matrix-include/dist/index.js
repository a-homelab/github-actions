"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertMatrixConfig = exports.assertInputs = void 0;
exports.main = main;
const core_1 = __importDefault(require("@actions/core"));
const typia_1 = __importDefault(require("typia"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const assertInputs = (input, errorFactory) => {
    const __is = input => {
        const $io0 = input => Array.isArray(input.matrix) && (input.matrix.length === 1 && "string" === typeof input.matrix[0]) && "string" === typeof input.includeFile;
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input))
        ((input, _path, _exceptionable = true) => {
            const $guard = typia_1.default.createAssert.guard;
            const $ao0 = (input, _path, _exceptionable = true) => ((Array.isArray(input.matrix) || $guard(_exceptionable, {
                path: _path + ".matrix",
                expected: "[string]",
                value: input.matrix
            }, errorFactory)) && ((input.matrix.length === 1 || $guard(_exceptionable, {
                path: _path + ".matrix",
                expected: "[string]",
                value: input.matrix
            }, errorFactory)) && ("string" === typeof input.matrix[0] || $guard(_exceptionable, {
                path: _path + ".matrix[0]",
                expected: "string",
                value: input.matrix[0]
            }, errorFactory))) || $guard(_exceptionable, {
                path: _path + ".matrix",
                expected: "[string]",
                value: input.matrix
            }, errorFactory)) && ("string" === typeof input.includeFile || $guard(_exceptionable, {
                path: _path + ".includeFile",
                expected: "string",
                value: input.includeFile
            }, errorFactory));
            return ("object" === typeof input && null !== input || $guard(true, {
                path: _path + "",
                expected: "Inputs",
                value: input
            }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "Inputs",
                value: input
            }, errorFactory);
        })(input, "$input", true);
    return input;
};
exports.assertInputs = assertInputs;
const assertMatrixConfig = (input, errorFactory) => {
    const __is = input => {
        const $io0 = input => Array.isArray(input.matrix) && (input.matrix.length === 1 && ("object" === typeof input.matrix[0] && null !== input.matrix[0] && $io1(input.matrix[0])));
        const $io1 = input => "string" === typeof input.key && (Array.isArray(input.include) && (input.include.length === 1 && (input.include[0] instanceof Map && (() => [...input.include[0]].every(elem => Array.isArray(elem) && (elem.length === 2 && "string" === typeof elem[0] && true)))())));
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input))
        ((input, _path, _exceptionable = true) => {
            const $guard = typia_1.default.createAssert.guard;
            const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.matrix) || $guard(_exceptionable, {
                path: _path + ".matrix",
                expected: "[{ key: string; include: [Map<string, unknown>]; }]",
                value: input.matrix
            }, errorFactory)) && ((input.matrix.length === 1 || $guard(_exceptionable, {
                path: _path + ".matrix",
                expected: "[__type]",
                value: input.matrix
            }, errorFactory)) && (("object" === typeof input.matrix[0] && null !== input.matrix[0] || $guard(_exceptionable, {
                path: _path + ".matrix[0]",
                expected: "__type",
                value: input.matrix[0]
            }, errorFactory)) && $ao1(input.matrix[0], _path + ".matrix[0]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".matrix[0]",
                expected: "__type",
                value: input.matrix[0]
            }, errorFactory))) || $guard(_exceptionable, {
                path: _path + ".matrix",
                expected: "[{ key: string; include: [Map<string, unknown>]; }]",
                value: input.matrix
            }, errorFactory);
            const $ao1 = (input, _path, _exceptionable = true) => ("string" === typeof input.key || $guard(_exceptionable, {
                path: _path + ".key",
                expected: "string",
                value: input.key
            }, errorFactory)) && ((Array.isArray(input.include) || $guard(_exceptionable, {
                path: _path + ".include",
                expected: "[Map<string, unknown>]",
                value: input.include
            }, errorFactory)) && ((input.include.length === 1 || $guard(_exceptionable, {
                path: _path + ".include",
                expected: "[Map<string, any>]",
                value: input.include
            }, errorFactory)) && ((input.include[0] instanceof Map || $guard(_exceptionable, {
                path: _path + ".include[0]",
                expected: "Map<string, any>",
                value: input.include[0]
            }, errorFactory)) && (() => [...input.include[0]].every((elem, _index1) => (Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".include[0][" + _index1 + "]",
                expected: "[string, any]",
                value: elem
            }, errorFactory)) && ((elem.length === 2 || $guard(_exceptionable, {
                path: _path + ".include[0][" + _index1 + "]",
                expected: "[string, any]",
                value: elem
            }, errorFactory)) && ("string" === typeof elem[0] || $guard(_exceptionable, {
                path: _path + ".include[0][" + _index1 + "][0]",
                expected: "string",
                value: elem[0]
            }, errorFactory)) && true) || $guard(_exceptionable, {
                path: _path + ".include[0][" + _index1 + "]",
                expected: "[string, any]",
                value: elem
            }, errorFactory)))() || $guard(_exceptionable, {
                path: _path + ".include[0]",
                expected: "Map<string, any>",
                value: input.include[0]
            }, errorFactory))) || $guard(_exceptionable, {
                path: _path + ".include",
                expected: "[Map<string, unknown>]",
                value: input.include
            }, errorFactory));
            return ("object" === typeof input && null !== input || $guard(true, {
                path: _path + "",
                expected: "MatrixConfig",
                value: input
            }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "MatrixConfig",
                value: input
            }, errorFactory);
        })(input, "$input", true);
    return input;
};
exports.assertMatrixConfig = assertMatrixConfig;
function parseInputs() {
    return (0, exports.assertInputs)({
        matrix: JSON.parse(core_1.default.getInput("matrix")),
        includeFile: JSON.parse(core_1.default.getInput("include-file")),
    });
}
function parseMatrixConfig(inputs) {
    const file = fs_1.default.readFileSync(inputs.includeFile, "utf8");
    return (0, exports.assertMatrixConfig)(yaml_1.default.parse(file));
}
/**
 * The main function for the action.
 */
async function main() {
    try {
        const inputs = parseInputs();
        core_1.default.debug(`inputs: ${JSON.stringify(inputs)}`);
        const matrixConfig = parseMatrixConfig(inputs);
        core_1.default.debug(`matrix config: ${JSON.stringify(matrixConfig)}`);
        let include = [];
        matrixConfig.matrix.forEach((config) => {
            const filteredInclude = config.include.filter((includeEntry) => inputs.matrix.includes(((input, errorFactory) => {
                const __is = input => {
                    return "string" === typeof input;
                };
                if (false === __is(input))
                    ((input, _path, _exceptionable = true) => {
                        const $guard = typia_1.default.assert.guard;
                        return "string" === typeof input || $guard(true, {
                            path: _path + "",
                            expected: "string",
                            value: input
                        }, errorFactory);
                    })(input, "$input", true);
                return input;
            })(includeEntry.get(config.key))));
            include = include.concat(filteredInclude);
        });
        core_1.default.debug(`include: ${JSON.stringify(include)}`);
        core_1.default.setOutput("include", include);
    }
    catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error)
            core_1.default.setFailed(error.message);
    }
}
if (require.main === module) {
    main();
}
