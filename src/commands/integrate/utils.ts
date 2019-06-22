// import {promisify} from 'util'
import {/*exec, */execSync} from 'child_process'

import {TestMode} from '../types'
import {VALID_TEST_MODES} from '../test/utils'

// const execAsync = promisify(exec)

/**
 * Executes the specified command, logging out stdout & stderr
 * @param {string} command The command to execute
 * @param {string} [cwd] Current working directory of the child process
 */
export const execAndLog = async (command: string, cwd?: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('\nRunning:', command, '\n')

  // const {stdout, stderr} = await execAsync(command, {cwd})

  // if (stdout) {
  //   // eslint-disable-next-line no-console
  //   console.log(stdout)
  // }
  // if (stderr) {
  //   // eslint-disable-next-line no-console
  //   console.error(stderr)
  // }

  try {
    const stdout = execSync(command, {cwd})

    // eslint-disable-next-line no-console
    if (stdout) {
      // eslint-disable-next-line no-console
      console.log(stdout.toString())
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.stderr.toString())

    throw err
  }
}

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
