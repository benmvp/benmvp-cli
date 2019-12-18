import { resolve } from 'path'
import flatten from 'lodash/flatten'
import { ModuleFormat } from '../types'
import BASE_TSCONFIG from '../test/tsconfig.json'

interface BabelOptions {
  presets: string[]
  plugins?: string[]
  rootMode?: 'root' | 'upward' | 'upward-optional'
  configFile?: string
  envName?: string
  sourceType?: 'script' | 'module'
  ignore?: string[]
  only?: string[]
  retainLines?: boolean
  compact?: true | false | 'auto'
  minified?: boolean
  auxiliaryCommentBefore?: string
  auxiliaryCommentAfter?: string
  sourceMaps?: boolean
  sourceFileName?: string
  sourceRoot?: string
  moduleRoot?: string
  moduleIds?: string[]
  moduleId?: string
  babelrc?: boolean
  highlightCode?: boolean
  comments?: boolean
}
interface CLIOptions {
  filename?: string
  filenames: string[]
  extensions?: string
  keepFileExtension?: boolean
  watch?: boolean
  skipInitialBuild?: boolean
  outFile?: string
  outDir?: string
  relative?: boolean
  copyFiles?: boolean
  includeDotfiles?: boolean
  verbose?: boolean
  deleteDirOnStart?: boolean
  sourceMapTarget?: string
}

interface BabelCLIOptions {
  babelOptions: BabelOptions
  cliOptions: CLIOptions
}

interface BuildArgs {
  formats: Set<ModuleFormat>
  out: string
  watch: boolean
}

const VALID_BABEL_FORMATS = new Set(['cjs', 'esm'] as ModuleFormat[])

const BUILT_FILES_TO_REMOVE = ['**/__tests__/', '**/*.spec.*']

/**
 * Gets an array of options/arguments to pass babel, one for each valid format
 * @param {BuildArgs} options
 * @param {Set<ModuleFormat>} options.formats A set of the module formats to build
 * @param {string} options.out A path (relative or absolute) to the output directory
 *  for the built module formats
 * @param {boolean} options.watch A flag indicating whether or not to continuously
 *  generate the built module formats whenever source files change
 * @returns {BabelCLIOptions[]}
 */
export const getBabelArgs = ({
  formats,
  out: outputPath,
  watch,
}: BuildArgs): BabelCLIOptions[] => {
  const validatedFormats = [...formats].filter((format) =>
    VALID_BABEL_FORMATS.has(format),
  )

  const argsList = validatedFormats.map((format) => ({
    babelOptions: {
      presets: [resolve(__dirname, `babel-config-${format}.js`)],
      babelrc: false,
    },
    cliOptions: {
      filenames: [resolve(process.cwd(), 'src')],
      outDir: resolve(outputPath, format),
      extensions: '.ts,.tsx,.js,.jsx',
      watch,
      copyFiles: true,
    },
  }))

  return argsList
}

/**
 * Gets a list of arguments to pass Typescript
 * @param {BuildArgs} options
 * @param {Set<ModuleFormat>} options.formats A set of the module formats to build
 * @param {string} options.out A path (relative or absolute) to the output directory
 *  for the type definitions
 * @param {boolean} options.watch A flag indicating whether or not to continuously
 *  generate the type definitions whenever source files change
 * @returns {string[] | null}
 */
export const getTypescriptArgs = ({
  formats,
  out,
  watch,
}: BuildArgs): string[] | null => {
  if (!formats.has('type')) {
    return null
  }

  const { compilerOptions } = BASE_TSCONFIG
  const compilerOptionsAsArgs = flatten(
    Object.entries(compilerOptions).map(([optionName, optionValue]) => [
      `--${optionName}`,
      `${optionValue}`,
    ]),
  )

  const args = [
    ...compilerOptionsAsArgs,
    '--pretty',
    '--declaration',
    '--declarationDir',
    resolve(out, 'types'),
    '--emitDeclarationOnly',
    '--noEmit',
    'false',
    watch ? '--watch' : '',
    resolve(process.cwd(), 'src/index.ts'),
  ]

  return args
}

/**
 * Gets list of glob patterns of copied files that should be deleted after building
 * @param {string} outputPath A path (relative or absolute) to the output directory
 *  for the type definitions
 * @returns {string[]}
 */
export const getCopiedFilesToDelete = (outputPath: string): string[] =>
  BUILT_FILES_TO_REMOVE.map((glob) => resolve(`${outputPath}/${glob}`))
