import {promisify} from 'util'
import {exec} from 'child_process'

import {TestMode} from '../types'

const execAsync = promisify(exec)

/**
 * Executes the specified command, logging out stdout & stderr
 * @param {string} command The command to execute
 * @param {string} [cwd] Current working directory of the child process
 */
export const execAndLog = async (command: string, cwd?: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(`Running: ${command}`)

  const {stdout, stderr} = await execAsync(command, {cwd})

  if (stdout) {
    // eslint-disable-next-line no-console
    console.log(stdout)
  }
  if (stderr) {
    // eslint-disable-next-line no-console
    console.error(stderr)
  }
}

export interface IntegrateParams {
  modes: TestMode[];
  pattern: string;
}

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

  if (modes.length > 0) {
    testArgs = [...testArgs, '--modes', ...modes]
  }

  return testArgs.join(' ')
}
