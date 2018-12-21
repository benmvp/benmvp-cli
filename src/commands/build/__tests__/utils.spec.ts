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

    it('generates UMD + ESM w/ default output directory', () => {
      const [umdArgs, esmArgs] = getBabelArgs({
        formats: new Set(['umd', 'esm'] as Array<ModuleFormat>),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(umdArgs.babelOptions.presets[0]).toMatch('babel-config-umd.js')
      expect(umdArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/umd'))

      expect(esmArgs.babelOptions.presets[0]).toMatch('babel-config-esm.js')
      expect(esmArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/esm'))
    })

    it('still only generates UMD + ESM when more formats are specified', () => {
      const [umdArgs, esmArgs, ...otherArgs] = getBabelArgs({
        formats: new Set(['umd', 'esm', 'dist', 'type'] as Array<ModuleFormat>),
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })

      expect(otherArgs).toHaveLength(0)

      expect(umdArgs.babelOptions.presets[0]).toMatch('babel-config-umd.js')
      expect(umdArgs.cliOptions).toHaveProperty('outDir', resolve(process.cwd(), 'lib/umd'))

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
      const [umdArgs] = getBabelArgs({
        formats: new Set(['umd'] as Array<ModuleFormat>),
        out,
        watch: BUILD_ARGS.watch.default,
      })

      expect(umdArgs.cliOptions).toHaveProperty('outDir', `${out}/lib/umd`)
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
