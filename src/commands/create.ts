import {CREATE_ARGS, CREATE_POS_ARGS} from '../cli/args'
import {Result} from './types'

/**
 * Creates a new library with the specified name set up with infrastructure using `@benmvp/cli`
 * @param {Object} [options] The configuration options for testing the library
 * @param {string} [options.name] The name of the library to create or update
 * @param {ModuleFormat[]} [options.formats] A list of the module formats to build
 * @param {string} [options.out] A path (relative or absolute) to the output directory for the built module formats
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @returns {Promise<Result>} The result of executing the create
 */
export default async ({
  name: libraryName = CREATE_POS_ARGS.name.default,
  formats = CREATE_ARGS.formats.default,
  out = CREATE_ARGS.out.default,
  modes = CREATE_ARGS.modes.default,
} = {}): Promise<Result> => {
  // eslint-disable-next-line no-console
  console.log('run create', {formats, out, modes, libraryName})

  return {
    code: 0,
  }
}
