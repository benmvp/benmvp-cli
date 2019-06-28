import {START_ARGS} from '../../cli/args'
import {Result} from '../types'
import testCommand from '../test'

/**
 * Runs the specified modes of tests in on-going watch mode during active development
 * @param {Object} [options] The configuration options for running the library
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @param {string} [options.pattern]  Regexp pattern string that is matched against all tests paths before executing the test
 * @returns {Promise<Result>} The result of executing the start
 */
export default ({
  modes = START_ARGS.modes.default,
  pattern = START_ARGS.pattern.default,
} = {}): Promise<Result> => testCommand({
  modes,
  pattern,
  watch: true,
})
