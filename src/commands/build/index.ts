import babelCli from '@babel/cli/lib/babel/dir'
import {BUILD_ARGS} from '../../cli/args'
import {Result} from '../types'
import {getBabelArgs} from './utils'

/**
 * Builds the library into the desired module formats at the specified location
 * @param {Object} [options] The configuration options for building the library
 * @param {Array<ModuleFormat>} [options.formats] A list of the module formats to build
 * @param {string} [options.out] A path (relative or absolute) to the output directory for the built module formats
 * @param {boolean} [options.watch] A flag indicating whether or not to continuously generate the built module formats whenever source files change
 * @returns {Promise<Result>} The result of executing the build
 */
export default async ({
  formats = new Set(BUILD_ARGS.formats.default),
  out = BUILD_ARGS.out.default,
  watch = BUILD_ARGS.watch.default,
} = {}): Promise<Result> => {
  try {
    const babelArgsToRun = getBabelArgs({formats, out, watch})

    // disable-next-line no-await-in-loop
    for (const babelArgs of babelArgsToRun) {
      await babelCli(babelArgs)
    }
  } catch (error) {
    return {
      code: 1,
      message: 'Error running "build" command',
      error,
    }
  }

  return {
    code: 0,
  }
}
