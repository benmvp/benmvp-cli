import { resolve } from 'path'
import { readJson, writeJson } from 'fs-extra'
import { CREATE_ARGS, CREATE_POS_ARGS } from '../../cli/args'
import { Result } from '../types'
import { spawnAsync } from '../utils'
import { getUpdatePackageInfo } from './utils'

const INIT_SCRIPT_PATH = resolve(__dirname, 'init.sh')

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
    await spawnAsync(INIT_SCRIPT_PATH, [sanitizedLibraryName])

    const packageJsonPath = resolve(
      process.cwd(),
      sanitizedLibraryName,
      'package.json',
    )
    const updatedPackageJson = getUpdatePackageInfo(
      await readJson(packageJsonPath),
      { libraryName, formats, out, modes },
    )
    await writeJson(packageJsonPath, updatedPackageJson)

    // copy files
    // - Prettier configs: `.prettier*`, & `.vscode/settings.json`
    // - Github workflows: `.github/workflows`
    // - Github templates: `.github/pull_request_template.md` & `.github/ISSUE_TEMPLATE`
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
