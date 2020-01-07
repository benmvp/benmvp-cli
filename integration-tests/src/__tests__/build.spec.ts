import { resolve } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import { pathExists, readFile, remove } from 'fs-extra'

const execAsync = promisify(exec)
const CWD = process.cwd()

jest.setTimeout(30000)

describe('when no arguments are passed', () => {
  beforeAll(async () => {
    await execAsync('npx benmvp build')
  })
  afterAll(async () => {
    // clean up
    await remove('lib')
  })

  it('transpiles .ts(x) files', async () => {
    expect(await pathExists(resolve(CWD, 'lib/cjs/index.js'))).toBe(true)
    expect(await pathExists(resolve(CWD, 'lib/cjs/objects/animal.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/cjs/objects/horse.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/cjs/objects/snake.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/cjs/react/Counter.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/cjs/react/Button.js'))).toBe(true)

    expect(await pathExists(resolve(CWD, 'lib/esm/index.js'))).toBe(true)
    expect(await pathExists(resolve(CWD, 'lib/esm/objects/animal.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/esm/objects/horse.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/esm/objects/snake.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/esm/react/Counter.js'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/esm/react/Button.js'))).toBe(true)
  })
  it('generates typescript definitions', async () => {
    expect(await pathExists(resolve(CWD, 'lib/types/index.d.ts'))).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'lib/types/objects/animal.d.ts')),
    ).toBe(true)
    expect(await pathExists(resolve(CWD, 'lib/types/objects/horse.d.ts'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/types/objects/snake.d.ts'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/types/react/Counter.d.ts'))).toBe(
      true,
    )
    expect(await pathExists(resolve(CWD, 'lib/types/react/Button.d.ts'))).toBe(
      true,
    )
  })
  it('copies .js files', async () => {
    expect(await pathExists(resolve(CWD, 'lib/cjs/config.js'))).toBe(true)
    expect(await pathExists(resolve(CWD, 'lib/esm/config.js'))).toBe(true)
  })
  it('removes test files', async () => {
    expect(
      await pathExists(resolve(CWD, 'lib/esm/__tests__/build.spec.js')),
    ).toBe(false)
  })
  it('fully transpiles to CJS target', async () => {
    const cjsFile = await readFile(resolve(CWD, 'lib/cjs/index.js'), 'utf8')

    expect(cjsFile).not.toMatch('const ')
    expect(cjsFile).not.toMatch('export ')
    expect(cjsFile).not.toMatch('import ')
    expect(cjsFile).toMatch('var ')
    expect(cjsFile).toMatch('exports.')
    expect(cjsFile).toMatch('require(')
  })
  it('leaves ESM modules for ESM target', async () => {
    const esmFile = await readFile(resolve(CWD, 'lib/esm/index.js'), 'utf8')

    expect(esmFile).not.toMatch('const ')
    expect(esmFile).not.toMatch('exports.')
    expect(esmFile).not.toMatch('require(')
    expect(esmFile).toMatch('var ')
    expect(esmFile).toMatch('export ')
    expect(esmFile).toMatch('import ')
  })
})

describe('when format & output directory are specified', () => {
  beforeAll(async () => {
    await execAsync('npx benmvp build --formats esm type --out ./built/dist')
  })
  afterAll(async () => {
    // clean up
    await remove('built/dist')
  })

  it('transpiles .ts files into specified output folder', async () => {
    expect(await pathExists(resolve(CWD, 'built/dist/esm/index.js'))).toBe(true)
    expect(await pathExists(resolve(CWD, 'built/dist/esm/config.js'))).toBe(
      true,
    )
    expect(
      await pathExists(resolve(CWD, 'built/dist/esm/objects/animal.js')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/esm/objects/horse.js')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/esm/objects/snake.js')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/esm/react/Counter.js')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/esm/react/Button.js')),
    ).toBe(true)

    expect(await pathExists(resolve(CWD, 'built/dist/types/index.d.ts'))).toBe(
      true,
    )
    expect(
      await pathExists(resolve(CWD, 'built/dist/types/objects/animal.d.ts')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/types/objects/snake.d.ts')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/types/objects/horse.d.ts')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/types/react/Counter.d.ts')),
    ).toBe(true)
    expect(
      await pathExists(resolve(CWD, 'built/dist/types/react/Button.d.ts')),
    ).toBe(true)
  })
  it('does not create CJS files', async () => {
    expect(await pathExists(resolve(CWD, 'built/dist/cjs/index.js'))).toBe(
      false,
    )
    expect(
      await pathExists(resolve(CWD, 'built/dist/cjs/objects/animal.js')),
    ).toBe(false)
    expect(
      await pathExists(resolve(CWD, 'built/dist/cjs/objects/snake.js')),
    ).toBe(false)
    expect(
      await pathExists(resolve(CWD, 'built/dist/cjs/objects/horse.js')),
    ).toBe(false)
    expect(
      await pathExists(resolve(CWD, 'built/dist/cjs/react/Counter.js')),
    ).toBe(false)
    expect(
      await pathExists(resolve(CWD, 'built/dist/cjs/react/Button.js')),
    ).toBe(false)
  })
  it('does not put files in default location', async () => {
    expect(await pathExists(resolve(CWD, 'lib/esm/index.js'))).toBe(false)
    expect(await pathExists(resolve(CWD, 'lib/types/index.d.ts'))).toBe(false)
    expect(await pathExists(resolve(CWD, 'lib/esm/config.js'))).toBe(false)
    expect(await pathExists(resolve(CWD, 'lib/esm/objects/animal.js'))).toBe(
      false,
    )
    expect(await pathExists(resolve(CWD, 'lib/types/objects/snake.d.ts'))).toBe(
      false,
    )
  })
})
