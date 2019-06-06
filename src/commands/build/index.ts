import {promisify} from 'util'
import {exec} from 'child_process'
import runBabel from './run-babel'
import {BUILD_ARGS} from '../../cli/args'
import {Result, ModuleFormat} from '../types'
import {
  getBabelArgs,
  getTypescriptArgs,
  getCopiedFilesToDelete,
} from './utils'

const execAsync = promisify(exec)

/**
 * Builds the library into the desired module formats at the specified location
 * @param {Object} [options] The configuration options for building the library
 * @param {Array<ModuleFormat>} [options.formats] A list of the module formats to build
 * @param {string} [options.out] A path (relative or absolute) to the output directory for the built module formats
 * @param {boolean} [options.watch] A flag indicating whether or not to continuously generate the built module formats whenever source files change
 * @returns {Promise<Result>} The result of executing the build
 */
export default async ({
  formats = BUILD_ARGS.formats.default as ModuleFormat[],
  out = BUILD_ARGS.out.default as string,
  watch = BUILD_ARGS.watch.default as boolean,
} = {}): Promise<Result> => {
  try {
    const uniqueFormats = new Set(formats)
    const buildOptions = {formats: uniqueFormats, out, watch}
    const babelArgsToRun = getBabelArgs(buildOptions)
    const typeScriptArgsToRun = getTypescriptArgs(buildOptions)

    for (const babelArgs of babelArgsToRun) {
      // eslint-disable-next-line no-await-in-loop
      await runBabel(babelArgs)
    }

    if (typeScriptArgsToRun) {
      try {
        // when `benmvp-cli` is a module w/in a lib's node_modules, this should
        // still run the `tsc` script for `benmvp-cli`, which will run the tsc
        // binary. This was the easiest way to reliably get to the binary
        // no matter where we put the transpiled lib code
        await execAsync(`npx tsc ${typeScriptArgsToRun.join(' ')}`)
      } catch(err) {
        // eslint-disable-next-line no-console
        console.error(err.stdout)
        throw Error('Unable able to generate type definitions')
      }
    }

    // remove all of the copied files that we don't want in built directory
    await execAsync(`npx rimraf ${getCopiedFilesToDelete(out).join(' ')}`)
  } catch (error) {
    return {
      code: error.code || 1,
      message: 'Error running "build" command',
      error,
    }
  }

  return {
    code: 0,
  }
}
