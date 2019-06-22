import {resolve} from 'path'
import yargs from 'yargs'
import {ModuleFormat, TestMode, Command} from '../commands/types'

interface CommandOptions {
  [key: string]: yargs.Options;
}

interface YargsArgv {
  [x: string]: unknown;
  _: string[];
  $0: string;
}

const TEST_MODES = {
  modes: {
    describe: 'The types/modes of tests to run',
    alias: 'm',
    array: true,
    default: ['lint', 'type', 'unit'] as TestMode[],
  },
}
const TEST_PATTERN = {
  pattern: {
    describe: 'Regexp pattern string that is matched against all tests paths before executing the test',
    alias: 'p',
    string: true,
    default: '',
  },
}
const BUILD_FORMATS = {
  formats: {
    describe: 'The module formats to build',
    alias: 'f',
    array: true,
    default: ['type', 'esm', 'cjs'] as ModuleFormat[],
  },
}
const OUTPUT_PATH = {
  out: {
    describe: 'Path to the output directory for the built formats',
    alias: 'o',
    default: resolve(process.cwd(), 'lib'),
    string: true,
  },
}

export const CREATE_ARGS = {...BUILD_FORMATS, ...OUTPUT_PATH, ...TEST_MODES}
export const CREATE_POS_ARGS = {
  name: {
    description: 'Name of the library to create',
    default: 'my-awesome-lib',
    string: true,
  },
}
export const TEST_ARGS: CommandOptions = {
  ...TEST_MODES,
  ...TEST_PATTERN,
  watch: {
    describe: 'Re-run tests when source files change',
    alias: 'w',
    type: 'boolean',
    default: false,
  },
}
export const START_ARGS: CommandOptions = {
  ...TEST_MODES,
  ...TEST_PATTERN,
}
export const BUILD_ARGS: CommandOptions = {
  ...BUILD_FORMATS,
  ...OUTPUT_PATH,
  watch: {
    describe: 'Update built assets when source files change',
    alias: 'w',
    type: 'boolean',
    default: false,
  },
}
export const INTEGRATE_ARGS: CommandOptions = {
  ...TEST_MODES,
  ...TEST_PATTERN,
}

export const CREATE_COMMAND = 'create' as Command
export const TEST_COMMAND = 'test' as Command
export const START_COMMAND = 'start' as Command
export const BUILD_COMMAND = 'build' as Command
export const INTEGRATE_COMMAND = 'integrate' as Command

export const DEFAULT_COMMAND = CREATE_COMMAND

export const parseArgs = (args: string[]): YargsArgv =>
  yargs(args)
    .version()
    .command<CommandOptions>(
      TEST_COMMAND,
      'Runs linting, typing & unit tests for the library',
      TEST_ARGS,
    )
    .command<CommandOptions>(
      START_COMMAND,
      'Runs the lib\'s tests in watch mode',
      START_ARGS,
    )
    .command<CommandOptions>(
      BUILD_COMMAND,
      'Builds the library into desired module formats',
      BUILD_ARGS,
    )
    .command<CommandOptions>(
      INTEGRATE_COMMAND,
      'Runs integration tests for the library',
      INTEGRATE_ARGS,
    )
    .command(
      [`${CREATE_COMMAND} [name]`, '$0'],
      'Creates a new library with test/build infra using @benmvp/cli',
      (commandYargs: yargs.Argv) =>
        commandYargs.options(CREATE_ARGS).positional('name', CREATE_POS_ARGS.name),
    )
    .completion()
    .epilog('For more details, visit https://github.com/benmvp/benmvp-cli/blob/master/API.md')
    .help()
    .argv
