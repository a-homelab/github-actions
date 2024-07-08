import core from "@actions/core";
import typia from "typia";
import YAML from "yaml";
import fs from "fs";

type Inputs = {
  matrix: [string];
  includeFile: string;
};
export const assertInputs = typia.createAssert<Inputs>();

type MatrixConfig = {
  matrix: [
    {
      key: string;
      include: [Map<string, unknown>];
    },
  ];
};
export const assertMatrixConfig = typia.createAssert<MatrixConfig>();

function parseInputs(): Inputs {
  return assertInputs({
    matrix: JSON.parse(core.getInput("matrix")),
    includeFile: JSON.parse(core.getInput("include-file")),
  } as Inputs);
}

function parseMatrixConfig(inputs: Inputs): MatrixConfig {
  const file = fs.readFileSync(inputs.includeFile, "utf8");
  return assertMatrixConfig(YAML.parse(file));
}

/**
 * The main function for the action.
 */
export async function main() {
  try {
    const inputs = parseInputs();
    core.debug(`inputs: ${JSON.stringify(inputs)}`);
    const matrixConfig = parseMatrixConfig(inputs);
    core.debug(`matrix config: ${JSON.stringify(matrixConfig)}`);
    let include: Map<string, unknown>[] = [];
    matrixConfig.matrix.forEach((config) => {
      const filteredInclude = config.include.filter((includeEntry) =>
        inputs.matrix.includes(
          typia.assert<string>(includeEntry.get(config.key)),
        ),
      );
      include = include.concat(filteredInclude);
    });
    core.debug(`include: ${JSON.stringify(include)}`);
    core.setOutput("include", include);
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

if (require.main === module) {
  main();
}
