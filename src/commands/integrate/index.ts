import {resolve} from 'path'
import {exec} from 'child_process'
import {promisify} from 'util'
import {INTEGRATE_ARGS} from '../../cli/args'
import {Result} from '../types'
import {getTestArgs} from './utils'

const execAsync = promisify(exec)

const SCRIPT_PATH = resolve(__dirname, 'run.sh')

/**
 * Runs a one-time pass of the specified integration tests
 * @param {Object} [options] The configuration options for testing the library
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @param {string} [options.pattern]  Regexp pattern string that is matched against all tests paths before executing the test
 * @returns {Promise<Result>} The result of executing the test
 */
export default async ({
  modes = INTEGRATE_ARGS.modes.default,
  pattern = INTEGRATE_ARGS.pattern.default,
}): Promise<Result> => {
  try {
    const testArgs = getTestArgs({modes, pattern})

    const {stdout} = await execAsync(`${SCRIPT_PATH} ${testArgs}`)

    if (stdout) {
      // eslint-disable-next-line no-console
      console.log(stdout)
    }
  } catch (error) {
    if (error.stdout) {
      // eslint-disable-next-line no-console
      console.log(error.stdout)
    }
    if (error.stderr) {
      // eslint-disable-next-line no-console
      console.error(error.stderr)
    }

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

