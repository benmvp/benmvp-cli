import {TEST_ARGS} from '../cli/args'

export default async ({modes = TEST_ARGS.modes.default} = {}): Promise<any> => {
  // npx jest --config config/jest/config.js
  console.log('run test', {modes})
}
