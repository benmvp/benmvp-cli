import {TestMode} from '../types'
import {VALID_TEST_MODES} from '../test/utils'


export interface IntegrateParams {
  modes: TestMode[];
  pattern: string;
}

const VALID_TEST_MODE_NAMES = new Set(Object.keys(VALID_TEST_MODES))

/**
 * Retrieves the command-line arguments to pass to `benmvp test` based on the specified parameters
 * @param {IntegrateParams} params
 * @param {TestMode[]} options.modes List of the types or modes of tests to run
 * @param {string} options.pattern  Regexp pattern string that is matched against all tests paths before executing the test
 * @returns {string}
 */
export const getTestArgs = ({modes, pattern}: IntegrateParams): string => {
  let testArgs = [] as string[]

  if (pattern) {
    testArgs = [...testArgs, '--pattern', pattern]
  }

  const validSelectedModes = modes.filter((mode) => VALID_TEST_MODE_NAMES.has(mode))

  if (!validSelectedModes.length || validSelectedModes.length < modes.length) {
    throw new Error(`Invalid test modes specified: ${modes}`)
  }

  testArgs = [...testArgs, '--modes', ...validSelectedModes]

  return testArgs.join(' ')
}
