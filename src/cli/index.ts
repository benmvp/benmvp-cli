import pick from 'lodash/pick'
import {create, test as testCommand, start, build} from '..'
import {
  CREATE_ARGS,
  CREATE_POS_ARGS,
  TEST_ARGS,
  START_ARGS,
  BUILD_ARGS,
  DEFAULT_COMMAND,
  parseArgs,
} from './args'
import {Command, Result} from '../commands/types'

/**
 * Parses the specified array of CLI arguments to run the desired command
 * @param {Array<string>} [args] An array of CLI arguments similar to the arguments received by `process.argv` (after the first two elements)
 * @returns Promise<Result> The result of the executing the command
 */
export const run = (args: string[] = []): Promise<Result> => {
  const parsedArgs = parseArgs(args)
  const [firstCommand = DEFAULT_COMMAND] = parsedArgs._
  const command = firstCommand as Command

  switch (command) {
    case 'create':
      return create(
        pick(parsedArgs, [...Object.keys(CREATE_ARGS), ...Object.keys(CREATE_POS_ARGS)]),
      )
    case 'build':
      return build(pick(parsedArgs, Object.keys(BUILD_ARGS)))
    case 'test':
      return testCommand(pick(parsedArgs, Object.keys(TEST_ARGS)))
    case 'start':
      return start(pick(parsedArgs, Object.keys(START_ARGS)))
    default:
      throw new Error(
        `Command "${command}" is an invalid command. Pass "--help" for full list of commands.`,
      )
  }
}
