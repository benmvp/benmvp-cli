import {resolve} from 'path'
import babelCli from '@babel/cli/lib/babel/dir'
import {BUILD_ARGS} from '../../cli/args'
import {Result} from '../types'

/**
 * Builds the library into the desired module formats at the specified location
 * @param {Object} [options] The configuration options for building the library
 * @param {Array<ModuleFormat>} [options.formats] A list of the module formats to build
 * @param {string} [options.out] A path (relative or absolute) to the output directory for the built module formats
 * @param {boolean} [options.watch] A flag indicating whether or not to continuously generate the built module formats whenever source files change
 * @returns {Promise<Result>} The result of executing the build
 */
export default async ({
  formats = BUILD_ARGS.formats.default,
  out = BUILD_ARGS.out.default,
  watch = BUILD_ARGS.watch.default,
} = {}): Promise<Result> => {
  try {
    await babelCli({
      babelOptions: {
        presets: [resolve(__dirname, 'babel-preset.js')],
        babelrc: false,
        ignore: ['src/**/*.spec.ts'],
      },
      cliOptions: {
        filenames: [resolve(process.cwd(), 'src')],
        outDir: resolve(out, 'lib/umd'),
        extensions: '.ts,.js',
        watch,
      },
    })
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
