import { join, resolve } from 'path'
import { CREATE_ARGS } from '../../cli/args'
import { ModuleFormat, TestMode, Command } from '../types'

const getOutputPath = (out: string) => out || 'lib'

const areIdentical = <T>(first: T[], second: T[]): boolean => {
  const firstLookup = new Set(first)

  return (
    first.length === second.length &&
    second.every((item) => firstLookup.has(item))
  )
}

const formatBuildScript = (formats: ModuleFormat[], out: string) => {
  let args: string[] = []

  if (!areIdentical(formats, CREATE_ARGS.formats.default)) {
    args.push('--formats', formats.join(' '))
  }
  if (out !== CREATE_ARGS.out.default) {
    args.push('--out', getOutputPath(out))
  }

  return `benmvp build ${args.join(' ')}`.trim()
}

const formatTestScript = (command: Command, modes: TestMode[]) => {
  let args: string[] = []

  if (!areIdentical(modes, CREATE_ARGS.modes.default)) {
    args.push('--modes', modes.join(' '))
  }

  return `benmvp ${command} ${args.join(' ')}`.trim()
}

interface PackageJson {
  name: string
  version: string
  main?: string
  module?: string
  'jsnext:main'?: string
  types?: string
  files?: string[]
  license?: string
  publishConfig?: {
    [index: string]: string
  }
  engines?: {
    [index: string]: string
  }
  scripts?: {
    [index: string]: string
  }
  bin?: {
    [index: string]: string
  }
  dependencies?: {
    [index: string]: string
  }
  devDependencies?: {
    [index: string]: string
  }
}

interface CreateArgs {
  libraryName: string
  formats: ModuleFormat[]
  out: string
  modes: TestMode[]
}

/**
 * Updates package.json contents with various properties needed when creating a benmvp lib
 * @param {PackageJson} initialPackageInfo Initial package.json contents
 * @param {CreateArgs} options
 * @param {string} options.libraryName The name of the library being created
 * @param {ModuleFormat[]} options.formats A list of the module formats when building
 * @param {string} options.out A path (relative or absolute) to the output directory
 *  for the built module formats
 * @param {TestMode[]} options.modes List of the types or modes of tests to run when testing
 * @returns {PackageJson} Modified package.json reading for saving
 */
export const getUpdatePackageInfo = (
  initialPackageInfo: PackageJson,
  { libraryName, formats, out, modes }: CreateArgs,
): PackageJson => {
  const outputPath = getOutputPath(out)
  const formatsLookup = new Set(formats)
  let packageInfo = { ...initialPackageInfo }

  // Overwrite "name" to libraryName if it exists
  // especially if it is a scoped package and the name doesn't
  // match the directory name when the package.json was initialized
  if (libraryName) {
    packageInfo.name = libraryName
  }

  // enforce no version in package.json stored in git.
  // when semantic-release releases the package it'll
  // add the correct version, so we don't have to manually
  // manage it
  packageInfo.version = '0.0.0-semantically-released'

  // Overwrite "main" to `out` + `cjs/index.js`, if `cjs` format is specified
  if (formatsLookup.has('cjs')) {
    packageInfo.main = join(outputPath, 'cjs/index.js')
  }

  // Overwrite "module" & "jsnext:main" to `out` + `esm/index.js`, if `esm` format is specified
  if (formatsLookup.has('esm')) {
    packageInfo.module = join(outputPath, 'esm/index.js')
    packageInfo['jsnext:main'] = join(outputPath, 'esm/index.js')
  }

  // Overwrite "types" to `out` + `types/index.d.ts`, if `type` format is specified
  if (formatsLookup.has('type')) {
    packageInfo.types = join(outputPath, 'types/index.d.ts')
  }

  // Overwrite "files" to `out` array (formatted to begin w/ folder name)
  packageInfo.files = [resolve(outputPath).replace(`${process.cwd()}/`, '')]

  // Overwrite license to MIT
  packageInfo.license = 'MIT'

  // Overwrite "publishConfig.access" to ensure that scoped packages
  // can also be published since by default they are restricted
  // (https://docs.npmjs.com/misc/config#access)
  packageInfo.publishConfig = {
    ...packageInfo.publishConfig,
    access: 'public',
  }

  // - Overwrite "engines.node"
  packageInfo.engines = {
    ...packageInfo.engines,
    node: '>= 8',
  }

  packageInfo.scripts = {
    ...packageInfo.scripts,

    // Overwrite "scripts.start" to "benmvp start" + `modes` (omitting defaults)
    start: formatTestScript('start', modes),

    // Overwrite "scripts.test" to "benmvp test" + `modes` (omitting defaults)
    test: formatTestScript('test', modes),

    // Overwrite "scripts.build" to `benmvp build` w/ `formats` + `out` (omitting defaults)
    build: formatBuildScript(formats, out),

    // Overwrite "scripts.integrate" to "benmvp integrate" + `modes` (omitting defaults)
    integrate: formatTestScript('integrate', modes),
  }

  return packageInfo
}
