const TEST_MODES = {
  modes: {
    describe: 'The types/modes of tests to run',
    alias: 'm',
    array: true,
    default: ['type', 'lint', 'unit'],
  },
}
const BUILD_FORMATS = {
  formats: {
    describe: 'The module formats to build',
    alias: 'f',
    array: true,
    default: ['type', 'esm', 'umd', 'dist'],
  },
}
const OUTPUT_PATH = {
  out: {
    describe: 'Path to the output directory for the built formats',
    alias: 'o',
    default: '.',
    type: 'string',
  },
}

export const CREATE_ARGS = {
  ...BUILD_FORMATS,
  ...OUTPUT_PATH,
  ...TEST_MODES,
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

export const CREATE_COMMAND = 'create'
export const TEST_COMMAND = 'test'
export const START_COMMAND = 'start'
export const BUILD_COMMAND = 'build'

export const DEFAULT_COMMAND = CREATE_COMMAND
export type Command = 'create' | 'test' | 'start' | 'build'
