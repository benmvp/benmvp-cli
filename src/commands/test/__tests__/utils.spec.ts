import { getJestArgs, Args } from '../utils'
import { TestMode } from '../../types'

describe('getJestArgs', () => {
  it('throws an error if no args are specified', () => {
    const tryGet = (): void => {
      getJestArgs({} as Args)
    }

    expect(tryGet).toThrow()
  })

  describe('modes', () => {
    const DUMMY_MODE = 'foo' as TestMode

    it('throws an error if empty modes are specified', () => {
      const tryGet = (): void => {
        getJestArgs({ modes: [], pattern: '', watch: false })
      }

      expect(tryGet).toThrow()
    })

    it('throws an error if specified mode does not exist', () => {
      const tryGet = (): void => {
        getJestArgs({ modes: [DUMMY_MODE], pattern: '', watch: false })
      }

      expect(tryGet).toThrow()
    })

    it('throws an error if modes has a mix of valid and invalid', () => {
      const tryGet = (): void => {
        getJestArgs({ modes: ['type', DUMMY_MODE], pattern: '', watch: false })
      }

      expect(tryGet).toThrow()
    })

    it('returns single project when single valid mode is specified', () => {
      const actual = getJestArgs({ modes: ['type'], pattern: '', watch: false })

      expect(actual).toEqual(
        expect.arrayContaining([
          '--projects',
          expect.stringContaining('project-type.js'),
        ]),
      )
    })

    it('returns multiple projects when multiple valid modes are specified', () => {
      const actual = getJestArgs({
        modes: ['lint', 'spec'],
        pattern: '',
        watch: false,
      })

      expect(actual).toEqual(
        expect.arrayContaining([
          '--projects',
          expect.stringContaining('project-lint.js'),
          expect.stringContaining('project-spec.js'),
        ]),
      )
    })
  })

  describe('pattern', () => {
    it('includes --testPathPattern flag when pattern option is specified', () => {
      const pattern = 'api/'
      const actual = getJestArgs({ pattern, modes: ['lint'], watch: false })

      expect(actual).toEqual(
        expect.arrayContaining(['--testPathPattern', pattern]),
      )
    })

    it('does not include --testPathPattern flag when pattern option is empty string', () => {
      const actual = getJestArgs({ pattern: '', modes: ['lint'], watch: false })

      expect(actual).not.toContain('--testPathPattern')
    })
  })

  describe('watch', () => {
    it('includes --watch flag when watch option is specified as true', () => {
      const actual = getJestArgs({ watch: true, modes: ['spec'], pattern: '' })

      expect(actual).toContain('--watch')
    })

    it('does not include --watch flag when watch option is specified as false', () => {
      const actual = getJestArgs({ watch: false, modes: ['spec'], pattern: '' })

      expect(actual).not.toContain('--watch')
    })
  })

  describe('ci', () => {
    it('includes --ci flag when process.env.CI is true', () => {
      const origEnvCI = process.env.CI

      process.env.CI = 'true'

      const actual = getJestArgs({ modes: ['spec'], pattern: '', watch: false })

      expect(actual).toContain('--ci')

      process.env.CI = origEnvCI
    })

    it('does not include --ci flag when process.env.CI is unspecified', () => {
      const origEnvCI = process.env.CI

      process.env.CI = 'false'

      const actual = getJestArgs({ modes: ['spec'], pattern: '', watch: false })

      expect(actual).not.toContain('--ci')

      process.env.CI = origEnvCI
    })
  })
})
