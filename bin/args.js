const yargs = require('yargs')
const {
  CREATE_COMMAND,
  CREATE_ARGS,
  TEST_COMMAND,
  TEST_ARGS,
  BUILD_COMMAND,
  BUILD_ARGS,
  START_COMMAND,
  START_ARGS,
} = require('../lib/umd/cli/args')

const argv = yargs
  .version()
  .command(TEST_COMMAND, 'Runs linting, typing & unit tests for the library', TEST_ARGS)
  .command(START_COMMAND, "Runs the lib's tests in watch mode", START_ARGS)
  .command(BUILD_COMMAND, 'Builds the library into desired module formats', BUILD_ARGS)
  .command(
    [`${CREATE_COMMAND} [name]`, '$0'],
    'Creates a new library with test/build infra using @benmvp/cli',
    CREATE_ARGS,
  )
  .epilog('For more details, visit https://github.com/benmvp/benmvp-cli/blob/master/API.md')
  .help().argv

module.exports = argv
