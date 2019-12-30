import { resolve } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import {
  ensureDir,
  pathExists,
  readJson,
  ensureFile,
  remove,
  writeJson,
} from 'fs-extra'
import fetch from 'node-fetch'

interface PackageInfoResponse {
  'dist-tags': {
    latest: string
  }
}

const execAsync = promisify(exec)
const CWD = process.cwd()

jest.setTimeout(360000)

const getMockPackageJson = (packageName: string): object => ({
  name: packageName,
  version: '0.0.0-semantically-released',
  bin: {
    hello: 'bin/hello',
  },
  scripts: {
    start: 'benmvp start',
    test: 'benmvp test',
    build: 'benmvp build',
  },
  dependencies: {
    react: '^16.9.0',
    'react-dom': '^16.9.0',
  },
  devDependencies: {
    '@benmvp/cli': '^5.0.0',
    '@types/react': '^16.9.2',
    '@types/react-dom': '^16.8.5',
  },
})
const getLatestLibVersion = async (): Promise<string> => {
  const response = await fetch('https://registry.npmjs.org/@benmvp/cli')
  const packageInfo: PackageInfoResponse = await response.json()

  return packageInfo['dist-tags'].latest
}

describe('when `--name` argument is not specified', () => {
  const DIR_NAME = 'current-lib'
  const LIB_PATH = resolve(CWD, `../${DIR_NAME}`)

  beforeAll(async () => {
    // create some existing files
    await ensureFile(resolve(LIB_PATH, '.git/foo'))
    await writeJson(
      resolve(LIB_PATH, 'package.json'),
      getMockPackageJson('@benmvp/current-lib'),
    )

    process.chdir(LIB_PATH)
    await execAsync(
      'npx benmvp create --modes type spec lint --out ./lib --formats esm cjs type',
    )
  })
  afterAll(async () => {
    // clean up
    process.chdir(CWD)
    await remove(LIB_PATH)
  })

  it('skips `git init` when already a git repo', async () => {
    const gitPath = resolve(LIB_PATH, '.git')

    expect(await pathExists(gitPath)).toBe(true)
    expect(await pathExists(resolve(gitPath, 'foo'))).toBe(true)
  })

  it('skips `npm init` if package.json already exists, but updates it', async () => {
    const packageJsonPath = resolve(LIB_PATH, 'package.json')

    expect(await pathExists(packageJsonPath)).toBe(true)

    const packageJson = await readJson(packageJsonPath)

    expect(packageJson).toMatchObject({
      name: '@benmvp/current-lib',
      version: '0.0.0-semantically-released',

      // keeps `bin` from before
      bin: {
        hello: 'bin/hello',
      },

      scripts: {
        // scripts remain argument-free since the defaults were passed
        start: 'benmvp start',
        test: 'benmvp test',
        build: 'benmvp build --out ./lib',

        // adds `integrate` script
        integrate: 'benmvp integrate',
      },

      // keeps the existing dependencies
      dependencies: {
        react: '^16.9.0',
        'react-dom': '^16.9.0',
      },
      devDependencies: {
        '@types/react': '^16.9.2',
        '@types/react-dom': '^16.8.5',
      },
    })
  })

  it('overwrites existing `@benmvp/cli` package with latest version', async () => {
    const packageJson = await readJson(resolve(LIB_PATH, 'package.json'))
    const latestVersion = await getLatestLibVersion()

    expect(packageJson).toHaveProperty(
      'devDependencies.@benmvp/cli',
      `^${latestVersion}`,
    )
  })
})

describe('when `--name` argument is specified', () => {
  const MOCK_LIB_NAME = '@benmvp/new-lib'
  const LIB_PATH = resolve(CWD, `../benmvp-new-lib`)

  beforeAll(async () => {
    process.chdir('..')
    await execAsync(`npx benmvp create --name ${MOCK_LIB_NAME}`)
  })
  afterAll(async () => {
    // clean up
    process.chdir(CWD)
    await remove(LIB_PATH)
  })

  it('creates a sub dir with the specified name', async () => {
    expect(await pathExists(LIB_PATH)).toBe(true)
  })

  it('runs `git init`', async () => {
    const gitPath = resolve(LIB_PATH, '.git')

    expect(await pathExists(gitPath)).toBe(true)
    expect(await pathExists(resolve(gitPath, 'HEAD'))).toBe(true)
  })

  it('runs `npm init` and adds additional properties package.json', async () => {
    const packageJsonPath = resolve(LIB_PATH, 'package.json')

    expect(await pathExists(packageJsonPath)).toBe(true)

    const packageJson = await readJson(packageJsonPath)

    expect(packageJson).toMatchObject({
      name: MOCK_LIB_NAME,
      version: '0.0.0-semantically-released',

      scripts: {
        // overwrites existing scripts with new arguments
        start: 'benmvp start',
        test: 'benmvp test',
        build: 'benmvp build',
        integrate: 'benmvp integrate',
      },
    })
  })

  it('sets `@benmvp/cli` package with latest version', async () => {
    const packageJson = await readJson(resolve(LIB_PATH, 'package.json'))
    const latestVersion = await getLatestLibVersion()

    expect(packageJson).toHaveProperty(
      'devDependencies.@benmvp/cli',
      `^${latestVersion}`,
    )
  })
})

describe('when `--name` argument is specified and sub folder already exists', () => {
  const MOCK_LIB_NAME = 'existing-folder-lib'
  const LIB_PATH = resolve(CWD, `../${MOCK_LIB_NAME}`)

  beforeAll(async () => {
    // create some existing files
    await ensureDir(LIB_PATH)
    await writeJson(
      resolve(LIB_PATH, 'package.json'),
      getMockPackageJson(MOCK_LIB_NAME),
    )

    process.chdir('..')
    await execAsync(
      `npx benmvp create --name ${MOCK_LIB_NAME} -f esm cjs -m type spec --o ./built`,
    )
  })
  afterAll(async () => {
    // clean up
    process.chdir(CWD)
    await remove(LIB_PATH)
  })

  it('runs `git init` when folder is not yet a git repo', async () => {
    const gitPath = resolve(LIB_PATH, '.git')

    expect(await pathExists(gitPath)).toBe(true)
    expect(await pathExists(resolve(gitPath, 'HEAD'))).toBe(true)
  })

  it('skips `npm init` if package.json already exists, but updates it', async () => {
    const packageJsonPath = resolve(LIB_PATH, 'package.json')

    expect(await pathExists(packageJsonPath)).toBe(true)

    const packageJson = await readJson(packageJsonPath)

    expect(packageJson).toMatchObject({
      name: MOCK_LIB_NAME,
      version: '0.0.0-semantically-released',

      // keeps `bin` from before
      bin: {
        hello: 'bin/hello',
      },

      scripts: {
        // overwrites existing scripts with new arguments
        start: 'benmvp start --modes type spec',
        test: 'benmvp test --modes type spec',
        build: 'benmvp build --formats esm cjs --out ./built',

        // adds `integrate` script
        integrate: 'benmvp integrate --modes type spec',
      },

      // keeps the existing dependencies
      dependencies: {
        react: '^16.9.0',
        'react-dom': '^16.9.0',
      },
      devDependencies: {
        '@types/react': '^16.9.2',
        '@types/react-dom': '^16.8.5',
      },
    })
  })

  it('overwrites existing `@benmvp/cli` package with latest version', async () => {
    const packageJson = await readJson(resolve(LIB_PATH, 'package.json'))
    const latestVersion = await getLatestLibVersion()

    expect(packageJson).toHaveProperty(
      'devDependencies.@benmvp/cli',
      `^${latestVersion}`,
    )
  })
})
