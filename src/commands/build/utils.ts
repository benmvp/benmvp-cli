import {resolve} from 'path'
import {Options} from '@babel/cli/lib/babel/dir'
import {ModuleFormat} from '../types'

export interface Args {
  formats: Set<ModuleFormat>
  out: string
  watch: boolean
}

const VALID_FORMATS = new Set(['cjs', 'esm'] as Array<ModuleFormat>)

/**
 * Gets an array of options/arguments to pass babel, one for each valid format
 * @param {Object} options
 * @param {Set<ModuleFormat>} options.formats A set of the module formats to build
 * @param {string} options.out A path (relative or absolute) to the output directory for the built module formats
 * @param {boolean} options.watch A flag indicating whether or not to continuously generate the built module formats whenever source files change
 * @returns {Array<Options>}
 */
export const getBabelArgs = ({formats, out: outputPath, watch}: Args): Array<Options> => {
  const validatedFormats = [...formats].filter((format) => VALID_FORMATS.has(format))

  const foo = validatedFormats.map(
    (format) =>
      ({
        babelOptions: {
          presets: [resolve(__dirname, `babel-config-${format}.js`)],
          babelrc: false,
          ignore: ['src/**/*.spec.ts'],
        },
        cliOptions: {
          filenames: [resolve(process.cwd(), 'src')],
          outDir: resolve(outputPath, `lib/${format}`),
          extensions: '.ts,.js',
          watch,
          copyFiles: true,
        },
      } as Options),
  )

  return foo
}

/**
 * Generates a babel configuration for the specified module type
 * @param {'cjs' | 'esm'} moduleType The module type for which to generate a config
 */
export const getBabelConfig = (moduleType: 'cjs' | 'esm') => ({
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: moduleType === 'cjs' ? 'cjs' : false,
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-object-rest-spread',
  ],
})
