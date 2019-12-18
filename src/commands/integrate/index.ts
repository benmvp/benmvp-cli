import { resolve as pathResolve } from 'path'
import { spawn } from 'child_process'
import { INTEGRATE_ARGS } from '../../cli/args'
import { Result } from '../types'
import { getTestArgs } from './utils'

const SCRIPT_PATH = pathResolve(__dirname, 'run.sh')

const spawnAsync = (command: string, args: string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    const childProcess = spawn(command, args)

    childProcess.stdout.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(`${data}`)
    })
    childProcess.stderr.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.error(`${data}`)
    })
    childProcess.on('close', (code) => {
      if (code !== 0) {
        reject(
          new Error(`"${command} ${args.join(' ')}" exited with code ${code}`),
        )
      } else {
        resolve()
      }
    })
  })

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
