import { resolve } from 'path'
import { INTEGRATE_ARGS } from '../../cli/args'
import { Result } from '../types'
import { spawnAsync } from '../utils'
import { getTestArgs } from './utils'

const SCRIPT_PATH = resolve(__dirname, 'run.sh')

/**
 * Runs a one-time pass of the specified integration tests
 * @param {Object} [options] The configuration options for testing the library
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @param {string} [options.pattern]  Regexp pattern string that is matched against
 *  all tests paths before executing the test
 * @returns {Promise<Result>} The result of executing the test
 */
export default async ({
  modes = INTEGRATE_ARGS.modes.default,
  pattern = INTEGRATE_ARGS.pattern.default,
}): Promise<Result> => {
  try {
    const testArgs = getTestArgs({ modes, pattern })

    await spawnAsync(SCRIPT_PATH, testArgs)
  } catch (error) {
    return {
      code: 1,
      message: 'Error running "integrate" command',
      error,
    }
  }

  return {
    code: 0,
  }
}
