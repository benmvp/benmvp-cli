const yargs = require('yargs')

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
    default: ['esm', 'umd', 'dist'],
  },
}
const OUTPUT_PATH = {
  'output-path': {
    describe: 'Path to the output directory for the built formats',
    alias: 'o',
    default: '.',
    type: 'string',
  },
}

const argv = yargs
  .version()
  .command('test', 'Runs linting, typing & unit tests for the library', {
    ...TEST_MODES,
  })
  .command('start', "Runs the lib's tests in watch mode", {
    ...TEST_MODES,
  })
  .command('build', 'Builds the library into desired module formats', {
    ...BUILD_FORMATS,
    ...OUTPUT_PATH,
  })
  .command(
    ['create [name]', '$0'],
    'Creates a new library with test/build infra using @benmvp/cli',
    {
      ...BUILD_FORMATS,
      ...OUTPUT_PATH,
      ...TEST_MODES,
    },
  )
  .epilog('For more details, visit https://github.com/benmvp/benmvp-cli')
  .help().argv

module.exports = argv
