import {getJestArgs} from '../utils'

describe('getJestArgs', () => {
  it('throws an error if no modes are specified', () => {
    const tryGet = () => {
      getJestArgs({})
    }

    expect(tryGet).toThrowError()
  })

  it('throws an error if empty modes are specified', () => {
    const tryGet = () => {
      getJestArgs({modes: []})
    }

    expect(tryGet).toThrowError()
  })

  it('throws an error if specified mode does not exist', () => {
    const tryGet = () => {
      getJestArgs({modes: ['foo']})
    }

    expect(tryGet).toThrowError()
  })

  it('throws an error if modes has a mix of valid and invalid', () => {
    const tryGet = () => {
      getJestArgs({modes: ['type', 'foo']})
    }

    expect(tryGet).toThrowError()
  })

  it('returns single project when single valid mode is specified', () => {
    const actual = getJestArgs({modes: ['type']})
    expect(actual).toEqual(['--projects', expect.stringContaining('project-type.js')])
  })

  it('returns multiple projects when multiple valid modes are specified', () => {
    const actual = getJestArgs({modes: ['type', 'unit']})
    expect(actual).toEqual([
      '--projects',
      expect.stringContaining('project-type.js'),
      expect.stringContaining('project-unit.js'),
    ])
  })
})
