import {START_ARGS} from '../cli/args'
import {Result} from './types'

/**
 * Runs the specified modes of tests in on-going watch mode during active development
 * @param {Object} [options] The configuration options for running the library
 * @param {Array<TestMode>} [options.modes] List of the types or modes of tests to run
 * @returns {Promise<Result>} The result of executing the start
 */
export default async ({modes = START_ARGS.modes.default} = {}): Promise<Result> => {
  // npx jest --config config/jest/config.js --watch
  console.log('run start')

  return {
    code: 0,
  }
}
