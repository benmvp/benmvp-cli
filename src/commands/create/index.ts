import { resolve, parse } from 'path'
import { readJson, writeJson } from 'fs-extra'
import { CREATE_ARGS, CREATE_POS_ARGS } from '../../cli/args'
import { Result } from '../types'
import { spawnAsync } from '../utils'
import { getUpdatePackageInfo, CreateOptions } from './utils'

const INIT_SCRIPT_PATH = resolve(__dirname, 'init.sh')
const FILES_TO_REPLACE_REPO_REFS = ['CONTRIBUTING.md', 'CHANGELOG.md']

const initializeRepo = async (libraryName: string): Promise<void> => {
  // initialize the repo with the necessary files & dependencies
  await spawnAsync(INIT_SCRIPT_PATH, [libraryName])
}

const updatePackageJson = async (
  sanitizedLibraryName: string,
  createOptions: CreateOptions,
): Promise<void> => {
  // update the package.json with the necessary properties
  const packageJsonPath = resolve(
    process.cwd(),
    sanitizedLibraryName,
    'package.json',
  )
  const updatedPackageJson = getUpdatePackageInfo(
    await readJson(packageJsonPath),
    createOptions,
  )

  await writeJson(packageJsonPath, updatedPackageJson)
}

const replaceRepoNameReferences = async (
  sanitizedLibraryName: string,
): Promise<void> => {
  const cwd = process.cwd()
  // If there's no library name, we're using the CWD as repo root,
  // so we'll assume the name of CWD as the repo name
  const repoName = sanitizedLibraryName || parse(cwd).name

  await Promise.all(
    FILES_TO_REPLACE_REPO_REFS.map((filePath) =>
      spawnAsync('sed', [
        '-i',
        `''`,
        `s/benmvp-cli/${repoName}/g`,
        resolve(cwd, sanitizedLibraryName, filePath),
      ]),
    ),
  )
}

/**
 * Creates a new library with the specified name set up with infrastructure using `@benmvp/cli`
 * @param {Object} [options] The configuration options for testing the library
 * @param {string} [options.name] The name of the library to create or update
 * @param {ModuleFormat[]} [options.formats] A list of the module formats to build
 * @param {string} [options.out] A path (relative or absolute) to the output directory
 *  for the built module formats
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @returns {Promise<Result>} The result of executing the create
 */
export default async ({
  name: libraryName = CREATE_POS_ARGS.name.default,
  formats = CREATE_ARGS.formats.default,
  out = CREATE_ARGS.out.default,
  modes = CREATE_ARGS.modes.default,
} = {}): Promise<Result> => {
  try {
    const sanitizedLibraryName = libraryName.replace('@', '').replace('/', '-')

    await initializeRepo(sanitizedLibraryName)
    await updatePackageJson(sanitizedLibraryName, {
      libraryName,
      formats,
      out,
      modes,
    })
    await replaceRepoNameReferences(sanitizedLibraryName)
  } catch (error) {
    return {
      code: error.code || 1,
      message: `Error running "create" command (name=${libraryName}; formats=${formats.toString()}; out=${out}; modes=${modes.toString()})`,
      error,
    }
  }

  return {
    code: 0,
  }
}
