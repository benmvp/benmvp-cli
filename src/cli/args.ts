import yargs from 'yargs'
import {ModuleFormat, TestMode, Command} from '../commands/types'

const TEST_MODES = {
  modes: {
    describe: 'The types/modes of tests to run',
    alias: 'm',
    array: true,
    default: ['type', 'lint', 'unit'] as Array<TestMode>,
  },
}
const BUILD_FORMATS = {
  formats: {
    describe: 'The module formats to build',
    alias: 'f',
    array: true,
    default: ['type', 'esm', 'umd', 'dist'] as Array<ModuleFormat>,
  },
}
const OUTPUT_PATH = {
  out: {
    describe: 'Path to the output directory for the built formats',
    alias: 'o',
    default: '.',
    string: true,
  },
}

export const CREATE_ARGS = {
  ...BUILD_FORMATS,
  ...OUTPUT_PATH,
  ...TEST_MODES,
}
export const CREATE_POS_ARGS = {
  name: {
    description: 'Name of the library to create',
    default: 'my-awesome-lib',
    string: true,
  },
}
export const TEST_ARGS = TEST_MODES
export const START_ARGS = TEST_ARGS
export const BUILD_ARGS = {
  ...BUILD_FORMATS,
  ...OUTPUT_PATH,
  watch: {
    describe: 'Update built assets when source files change',
    alias: 'w',
    type: 'boolean',
    default: false,
  },
}

export const CREATE_COMMAND = 'create' as Command
export const TEST_COMMAND = 'test' as Command
export const START_COMMAND = 'start' as Command
export const BUILD_COMMAND = 'build' as Command

export const DEFAULT_COMMAND = CREATE_COMMAND

export const parseArgs = (args: Array<string>) =>
  yargs(args)
    .version()
    .command(TEST_COMMAND, 'Runs linting, typing & unit tests for the library', TEST_ARGS)
    .command(START_COMMAND, "Runs the lib's tests in watch mode", START_ARGS)
    .command(BUILD_COMMAND, 'Builds the library into desired module formats', BUILD_ARGS)
    .command(
      [`${CREATE_COMMAND} [name]`, '$0'],
      'Creates a new library with test/build infra using @benmvp/cli',
      (commandYargs: yargs.Argv) => {
        commandYargs.options(CREATE_ARGS).positional('name', CREATE_POS_ARGS.name)
      },
    )
    .epilog('For more details, visit https://github.com/benmvp/benmvp-cli/blob/master/API.md')
    .help().argv
