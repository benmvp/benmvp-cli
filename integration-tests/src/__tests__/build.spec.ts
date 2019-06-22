import {resolve} from 'path'
// import {promisify} from 'util'
import {/*exec, */execSync} from 'child_process'
import {pathExists, readFile} from 'fs-extra'

// const execAsync = promisify(exec)
const CWD = process.cwd()

jest.setTimeout(30000)

test('builds default formats/typing with no arguments passed', async () => {
  // await execAsync('yarn build')
  execSync('yarn build')

  // typescript files get transpiled
  expect(await pathExists(resolve(CWD, 'lib/cjs/index.js'))).toBe(true)
  expect(await pathExists(resolve(CWD, 'lib/esm/index.js'))).toBe(true)

  // typescript definition file gets generated
  expect(await pathExists(resolve(CWD, 'lib/types/index.d.ts'))).toBe(true)

  // js files get copied
  expect(await pathExists(resolve(CWD, 'lib/cjs/config.js'))).toBe(true)
  expect(await pathExists(resolve(CWD, 'lib/esm/config.js'))).toBe(true)

  // test files should be removed
  expect(await pathExists(resolve(CWD, 'lib/esm/__tests__/build.spec.js'))).toBe(false)

  const cjsFile = await readFile(resolve(CWD, 'lib/cjs/index.js'))
  const esmFile = await readFile(resolve(CWD, 'lib/esm/index.js'))

  // ensure full transpiling happens
  expect(cjsFile).not.toMatch('const ')
  expect(cjsFile).not.toMatch('export ')
  expect(cjsFile).not.toMatch('import ')
  expect(cjsFile).toMatch('var ')
  expect(cjsFile).toMatch('exports.')
  expect(cjsFile).toMatch('require(')

  // ensure ESM modules are still left
  expect(esmFile).not.toMatch('const ')
  expect(esmFile).not.toMatch('exports.')
  expect(esmFile).not.toMatch('require(')
  expect(esmFile).toMatch('var ')
  expect(esmFile).toMatch('export ')
  expect(esmFile).toMatch('import ')

  // clean up
  // await execAsync('npx rimraf lib')
  execSync(`npx rimraf ${resolve(CWD, 'lib')}`)
})

test('builds esm/typing in specified output directory', async () => {
  // await execAsync('yarn build --formats esm type --out ./built')
  execSync('yarn build --formats esm type --out ./built')

  expect(await pathExists(resolve(CWD, 'built/esm/index.js'))).toBe(true)
  expect(await pathExists(resolve(CWD, 'built/esm/config.js'))).toBe(true)
  expect(await pathExists(resolve(CWD, 'built/types/index.d.ts'))).toBe(true)

  // ensure CJS format was not created
  expect(await pathExists(resolve(CWD, 'built/cjs/index.js'))).toBe(false)

  // ensure they don't exist in default location
  expect(await pathExists(resolve(CWD, 'lib/esm/index.js'))).toBe(false)
  expect(await pathExists(resolve(CWD, 'lib/types/index.d.js'))).toBe(false)
  expect(await pathExists(resolve(CWD, 'lib/esm/config.js'))).toBe(true)

  // test files should be removed
  expect(await pathExists(resolve(CWD, 'built/esm/__tests__/build.spec.js'))).toBe(false)

  // clean up
  // await execAsync('npx rimraf built')
  execSync(`npx rimraf ${resolve(CWD, 'built')}`)
})
