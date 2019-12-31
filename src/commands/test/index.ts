import { TEST_ARGS } from '../../cli/args'
import { Result } from '../types'
import { getJestArgs } from './utils'
import runJest from './run-jest'

/**
 * Runs a one-time pass of the specified modes of tests
 * @param {Object} [options] The configuration options for testing the library
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @param {string} [options.pattern]  Regexp pattern string that is matched against
 *  all tests paths before executing the test
 * @param {boolean} [options.watch] Whether or not to re-run tests as source files change
 * @returns {Promise<Result>} The result of executing the test
 */
export default async ({
  modes = TEST_ARGS.modes.default,
  pattern = TEST_ARGS.pattern.default,
  watch = TEST_ARGS.watch.default,
} = {}): Promise<Result> => {
  try {
    await runJest(getJestArgs({ modes, pattern, watch }))
  } catch (error) {
    return {
      code: 1,
      message: 'Error running "test" command',
      error,
    }
  }

  return {
    code: 0,
  }
}
