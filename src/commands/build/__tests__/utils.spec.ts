import {resolve} from 'path'
import {
  getBabelArgs,
  getTypescriptArgs,
  getCopiedFilesToDelete,
} from '../utils'
import {BUILD_ARGS} from '../../../cli/args'
import {ModuleFormat} from '../../types'
import BASE_TSCONFIG from '../../test/tsconfig.json'

const CWD = process.cwd()

describe('getBabelArgs', () => {
  describe('source files', () => {
    it('uses current working directory for source files location', () => {
      const [firstSetOfArgs] = getBabelArgs({
        formats: BUILD_ARGS.formats.default,
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(firstSetOfArgs.cliOptions.filenames).toEqual([resolve(CWD, 'src')])
    })
  })

  describe('formats + out', () => {
    it('returns empty array when empty formats are specified', () => {
      const babelArgsToRun = getBabelArgs({
        formats: new Set(),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(babelArgsToRun).toHaveLength(0)
    })

    it('generates CJS + ESM w/ default output directory', () => {
      const [cjsArgs, esmArgs] = getBabelArgs({
        formats: new Set(['cjs', 'esm'] as ModuleFormat[]),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(cjsArgs.babelOptions.presets[0]).toMatch('babel-config-cjs.js')
      expect(cjsArgs.cliOptions).toHaveProperty('outDir', resolve(CWD, 'lib/cjs'))

      expect(esmArgs.babelOptions.presets[0]).toMatch('babel-config-esm.js')
      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(CWD, 'lib/esm'))
    })

    it('still only generates CJS + ESM when more formats are specified', () => {
      const [cjsArgs, esmArgs, ...otherArgs] = getBabelArgs({
        formats: new Set(['cjs', 'esm', 'type'] as ModuleFormat[]),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(otherArgs).toHaveLength(0)

      expect(cjsArgs.babelOptions.presets[0]).toMatch('babel-config-cjs.js')
      expect(cjsArgs.cliOptions).toHaveProperty('outDir', resolve(CWD, 'lib/cjs'))

      expect(esmArgs.babelOptions.presets[0]).toMatch('babel-config-esm.js')
      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(CWD, 'lib/esm'))
    })

    it('sets correct outDir when `out` is relative', () => {
      const out = './built'
      const [esmArgs] = getBabelArgs({
        formats: new Set(['esm'] as ModuleFormat[]),
        out,
        watch: BUILD_ARGS.watch.default,
      })

      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(out, 'esm'))
    })

    it('sets correct outDir when `out` is absolute', () => {
      const out = '/path/to/built'
      const [cjsArgs] = getBabelArgs({
        formats: new Set(['cjs'] as ModuleFormat[]),
        out,
        watch: BUILD_ARGS.watch.default,
      })

      expect(cjsArgs.cliOptions).toHaveProperty('outDir', `${out}/cjs`)
    })
  })

  describe('watch option', () => {
    it('adds watch: true to `cliOptions` for each valid format when `true`', () => {
      const babelArgsToRun = getBabelArgs({
        formats: new Set(BUILD_ARGS.formats.default),
        out: BUILD_ARGS.out.default,
        watch: true,
      })

      babelArgsToRun.forEach(({cliOptions}) => {
        expect(cliOptions).toHaveProperty('watch', true)
      })
    })

    it('adds watch: false to `cliOptions` for each valid format when `false`', () => {
      const babelArgsToRun = getBabelArgs({
        formats: new Set(BUILD_ARGS.formats.default),
        out: BUILD_ARGS.out.default,
        watch: false,
      })

      babelArgsToRun.forEach(({cliOptions}) => {
        expect(cliOptions).toHaveProperty('watch', false)
      })
    })
  })
})

describe('getTypescriptArgs', () => {
  describe('type format not requested', () => {
    it('returns null if `formats` is empty', () => {
      const typescriptArgs = getTypescriptArgs({
        formats: new Set(),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(typescriptArgs).toBeNull()
    })

    it('returns null if `formats` does not contain "type"', () => {
      const typescriptArgs = getTypescriptArgs({
        formats: new Set(['esm'] as ModuleFormat[]),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(typescriptArgs).toBeNull()
    })
  })

  describe('type format requested', () => {
    it('includes all of the args from base config', () => {
      const typescriptArgs = getTypescriptArgs({
        formats: new Set(['esm', 'type'] as ModuleFormat[]),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      Object.entries(BASE_TSCONFIG.compilerOptions).forEach(([optionName, optionValue]) => {
        expect(typescriptArgs).toEqual(expect.arrayContaining([`--${optionName}`, `${optionValue}`]))
      })
    })

    it('specifies generic declaration information', () => {
      const typescriptArgs = getTypescriptArgs({
        formats: new Set(['esm', 'type'] as ModuleFormat[]),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(typescriptArgs).toContain('--declaration')
      expect(typescriptArgs).toContain('--emitDeclarationOnly')
      expect(typescriptArgs).toEqual(expect.arrayContaining(['--noEmit', 'false']))
    })

    it('specifies the declaration destination when `out` is relative', () => {
      const out = './built'
      const typescriptArgs = getTypescriptArgs({
        formats: new Set(['type'] as ModuleFormat[]),
        out,
        watch: BUILD_ARGS.watch.default,
      })

      expect(typescriptArgs).toEqual(expect.arrayContaining([
        '--declarationDir',
        resolve(out, 'types'),
      ]))
    })

    it('specifies the declaration destination when `out` is absolute', () => {
      const typescriptArgs = getTypescriptArgs({
        formats: new Set(['type'] as ModuleFormat[]),
        out: '/out/dir',
        watch: BUILD_ARGS.watch.default,
      })

      expect(typescriptArgs).toEqual(expect.arrayContaining([
        '--declarationDir',
        '/out/dir/types',
      ]))
    })

    describe('watch option', () => {
      it('includes --watch when `watch` is true', () => {
        const typescriptArgs = getTypescriptArgs({
          formats: new Set(['type'] as ModuleFormat[]),
          out: BUILD_ARGS.out.default,
          watch: true,
        })

        expect(typescriptArgs).toContain('--watch')
      })

      it('does not include --watch when `watch` is false', () => {
        const typescriptArgs = getTypescriptArgs({
          formats: new Set(['type'] as ModuleFormat[]),
          out: BUILD_ARGS.out.default,
          watch: false,
        })

        expect(typescriptArgs).not.toContain('--watch')
      })
    })

    describe('source files', () => {
      it('uses current working directory for source files location', () => {
        const typescriptArgs = getTypescriptArgs({
          formats: new Set(['type'] as ModuleFormat[]),
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })

        expect(typescriptArgs).toContain(resolve(CWD, 'src/**/*.ts'))
      })
    })
  })
})

describe('getCopiedFilesToDelete', () => {
  it('prepends the passed in output path to the glob patterns (when relative)', () => {
    const files = getCopiedFilesToDelete('./built')

    files.forEach((globPattern) => {
      expect(globPattern).toMatch(new RegExp(`^${resolve(CWD, 'built')}/`))
    })
  })

  it('prepends the passed in output path to the glob patterns (when absolute)', () => {
    const files = getCopiedFilesToDelete('/path/to/built')

    files.forEach((globPattern) => {
      expect(globPattern).toMatch(new RegExp('/path/to/built/'))
    })
  })
})
