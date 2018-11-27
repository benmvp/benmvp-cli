import jest from 'jest'
import {TEST_ARGS} from '../cli/args'
import {Result} from './types'
import {modesAreValid} from './utils'
import jestConfig from '../../config/jest/config'

/**
 * Runs a one-time pass of the specified modes of tests
 * @param {Object} [options] The configuration options for testing the library
 * @param {Array<TestMode>} [options.modes] List of the types or modes of tests to run
 * @returns Promise<Result> The result of executing the start
 */
export default async ({modes = TEST_ARGS.modes.default} = {}): Promise<Result> => {
  // npx jest --config config/jest/config.js
  console.log('run test', {modes}, process.cwd(), jestConfig)

  try {
    if (modesAreValid(modes)) {
      await jest.run(['--config', JSON.stringify(jestConfig), '--projects', ...modes])
    }
  } catch (ex) {
    return {
      code: 1,
      message: 'Error running test command',
      error: ex,
    }
  }

  return {
    code: 0,
  }
}
