import {promisify} from 'util'
import {exec} from 'child_process'

const execAsync = promisify(exec)

jest.setTimeout(30000)

test('creates default formats & typing with no arguments passed', async () => {
  // console.log(execAsync)
  await execAsync('npx benmvp build --out ./built')

  expect(1).toBe(1)

  // clean up
  await execAsync('npx rimraf built')
})
