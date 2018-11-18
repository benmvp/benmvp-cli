import yargs from 'yargs'
import {pick} from 'lodash'
import {create, test, start, build} from '../'
import {Command, CREATE_ARGS, TEST_ARGS, START_ARGS, BUILD_ARGS, DEFAULT_COMMAND} from './args'

export const run = (argv: object): Promise<any> => {
  const [argv_ = DEFAULT_COMMAND] = (argv as yargs.Arguments)._

  const command = argv_ as Command

  switch (command) {
    case 'create':
      return create(pick(argv, Object.keys(CREATE_ARGS)))
    case 'build':
      return build(pick(argv, Object.keys(BUILD_ARGS)))
    case 'test':
      return test(pick(argv, Object.keys(TEST_ARGS)))
    case 'start':
      return start(pick(argv, Object.keys(START_ARGS)))
  }

  throw new Error(
    `Command "${command}" is an invalid command. Pass "--help" for full list of commands.`,
  )
}
