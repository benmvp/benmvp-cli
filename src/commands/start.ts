import {START_ARGS} from '../cli/args'

export default async ({modes = START_ARGS.modes.default} = {}): Promise<any> => {
  // npx jest --config config/jest/config.js --watch
  console.log('run start')
}
