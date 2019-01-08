import {resolve} from 'path'
import {getBabelArgs, Args} from '../utils'
import {BUILD_ARGS} from '../../../cli/args'
import {ModuleFormat} from '../../types'

describe('getBabelArgs', () => {
  describe('formats + out', () => {
    it('throws an error if format is not specified', () => {
      const callGetBabelArgs = () => {
        getBabelArgs({
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        } as Args)
      }

      expect(callGetBabelArgs).toThrowError()
    })

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
        formats: new Set(['cjs', 'esm'] as Array<ModuleFormat>),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(cjsArgs.babelOptions.presets[0]).toMatch('babel-config-cjs.js')
      expect(cjsArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/cjs'))

      expect(esmArgs.babelOptions.presets[0]).toMatch('babel-config-esm.js')
      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/esm'))
    })

    it('still only generates CJS + ESM when more formats are specified', () => {
      const [cjsArgs, esmArgs, ...otherArgs] = getBabelArgs({
        formats: new Set(['cjs', 'esm', 'type'] as Array<ModuleFormat>),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(otherArgs).toHaveLength(0)

      expect(cjsArgs.babelOptions.presets[0]).toMatch('babel-config-cjs.js')
      expect(cjsArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/cjs'))

      expect(esmArgs.babelOptions.presets[0]).toMatch('babel-config-esm.js')
      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/esm'))
    })

    it('sets correct outDir when `out` is relative', () => {
      const out = './built'
      const [esmArgs] = getBabelArgs({
        formats: new Set(['esm'] as Array<ModuleFormat>),
        out,
        watch: BUILD_ARGS.watch.default,
      })

      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(out, 'lib/esm'))
    })

    it('sets correct outDir when `out` is absolute', () => {
      const out = '/path/to/built'
      const [cjsArgs] = getBabelArgs({
        formats: new Set(['cjs'] as Array<ModuleFormat>),
        out,
        watch: BUILD_ARGS.watch.default,
      })

      expect(cjsArgs.cliOptions).toHaveProperty('outDir', `${out}/lib/cjs`)
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

describe('getBabelConfig', () => {})
