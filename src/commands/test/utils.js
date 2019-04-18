import { resolve } from 'path';
// NOTE: Ideally we'd point to project configuration objects for
// each type instead of files that contain the configuration, but
// Jest kept throwing an error even though it says it supports the
// functionality. See: https://github.com/facebook/jest/issues/7415
const VALID_TEST_MODES = {
    type: resolve(__dirname, 'project-type.js'),
    lint: resolve(__dirname, 'project-lint.js'),
    unit: resolve(__dirname, 'project-unit.js'),
};
/**
 * Retrieves the arguments to pass to Jest based on the specified options
 * @param {Object} options The configuration options for testing the library
 * @param {Array<TestMode>} options.modes List of the types or modes of tests to run
 * @param {boolean} options.watch Whether or not to re-run tests as source files change
 * @returns {Array<string>} The array of arguments
 */
export const getJestArgs = ({ modes, watch }) => {
    let jestArgs = [];
    if (watch) {
        jestArgs = [...jestArgs, '--watch'];
    }
    const validModes = modes.filter((mode) => mode in VALID_TEST_MODES);
    if (!validModes.length || validModes.length < modes.length) {
        throw new Error(`Invalid test modes specified: ${modes}`);
    }
    const projects = validModes.map((mode) => VALID_TEST_MODES[mode]);
    jestArgs = [...jestArgs, '--projects', ...projects];
    return jestArgs;
};
