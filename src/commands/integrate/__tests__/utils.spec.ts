import {getTestArgs, IntegrateParams} from '../utils'
import {TestMode} from '../../types'


describe('getTestArgs', () => {
  it('throws an error if no args are specified', () => {
    const tryGet = (): void => {
      getTestArgs({} as IntegrateParams)
    }

    expect(tryGet).toThrow()
  })

  describe('modes', () => {
    const DUMMY_MODE = 'foo' as TestMode

    it('throws an error if empty modes are specified', () => {
      const tryGet = (): void => {
        getTestArgs({modes: [], pattern: ''})
      }

      expect(tryGet).toThrow()
    })

    it('throws an error if specified mode does not exist', () => {
      const tryGet = (): void => {
        getTestArgs({modes: [DUMMY_MODE], pattern: ''})
      }

      expect(tryGet).toThrow()
    })

    it('throws an error if modes has a mix of valid and invalid', () => {
      const tryGet = (): void => {
        getTestArgs({modes: ['type', DUMMY_MODE], pattern: ''})
      }

      expect(tryGet).toThrow()
    })

    it('returns single arg when single valid mode is specified', () => {
      const actual = getTestArgs({modes: ['type'], pattern: ''})

      expect(actual).toEqual(expect.arrayContaining(['--modes', 'type']))
    })

    it('returns multiple args when multiple valid modes are specified', () => {
      const actual = getTestArgs({modes: ['lint', 'spec'], pattern: ''})

      expect(actual).toEqual(expect.arrayContaining(['--modes', 'lint', 'spec']))
    })
  })

  describe('pattern', () => {
    it('includes --pattern flag when pattern option is specified', () => {
      const pattern = 'api/'
      const actual = getTestArgs({pattern, modes: ['lint']})

      expect(actual).toEqual(expect.arrayContaining(['--pattern', pattern]))
    })

    it('does not include --testPathPattern flag when pattern option is empty string', () => {
      const actual = getTestArgs({pattern: '', modes: ['lint']})

      expect(actual).not.toContain('--pattern')
    })
  })
})
