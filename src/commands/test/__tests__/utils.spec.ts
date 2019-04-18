import {getJestArgs, Args} from '../utils'
import {TestMode} from '../../types'

describe('getJestArgs', () => {
  it('throws an error if no args are specified', () => {
    const tryGet = () => {
      getJestArgs({} as Args)
    }

    expect(tryGet).toThrow()
  })

  describe('modes', () => {
    const DUMMY_MODE = 'foo' as TestMode

    it('throws an error if empty modes are specified', () => {
      const tryGet = () => {
        getJestArgs({modes: [], watch: false})
      }

      expect(tryGet).toThrow()
    })

    it('throws an error if specified mode does not exist', () => {
      const tryGet = () => {
        getJestArgs({modes: [DUMMY_MODE], watch: false})
      }

      expect(tryGet).toThrow()
    })

    it('throws an error if modes has a mix of valid and invalid', () => {
      const tryGet = () => {
        getJestArgs({modes: ['type', DUMMY_MODE], watch: false})
      }

      expect(tryGet).toThrow()
    })

    it('returns single project when single valid mode is specified', () => {
      const actual = getJestArgs({modes: ['type'], watch: false})

      expect(actual).toEqual(['--projects', expect.stringContaining('project-type.js')])
    })

    it('returns multiple projects when multiple valid modes are specified', () => {
      const actual = getJestArgs({modes: ['lint', 'unit'], watch: false})

      expect(actual).toEqual([
        '--projects',
        expect.stringContaining('project-lint.js'),
        expect.stringContaining('project-unit.js'),
      ])
    })
  })

  describe('watch', () => {
    it('includes --watch flag when watch option is specified as true', () => {
      const actual = getJestArgs({watch: true, modes: ['unit']})

      expect(actual).toEqual(['--watch', '--projects', expect.stringContaining('project-unit.js')])
    })
  })
})
