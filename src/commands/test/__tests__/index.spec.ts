import testCommand from '..'
import runJest from '../run-jest'
import {TestMode} from '../../types'

jest.mock('../run-jest')

describe('error cases', () => {
  it('returns an error w/ empty modes', async() => {
    const result = await testCommand({modes: []})

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })

  it('returns an error w/ invalid mode', async() => {
    const DUMMY_MODE = 'foo' as TestMode
    const result = await testCommand({modes: [DUMMY_MODE]})

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })

  it('returns an error if jest fails (for some reason)', async() => {
    runJest.mockResolvedValue(Promise.reject(new Error('Jest failed!')))
    const result = await testCommand({modes: ['unit']})

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })

    runJest.mockReset()
  })
})

describe('success cases', () => {
  afterEach(() => {
    runJest.mockReset()
  })

  it('calls jest with args and returns success when no options are passed', async() => {
    const result = await testCommand()

    expect(runJest).toHaveBeenCalledWith([
      '--projects',
      expect.stringContaining('project-type.js'),
      expect.stringContaining('project-lint.js'),
      expect.stringContaining('project-unit.js'),
    ])

    expect(result).toEqual({code: 0})
  })

  describe('modes', () => {
    it('calls jest with args and returns success when no modes are passed', async() => {
      const result = await testCommand({})

      expect(runJest).toHaveBeenCalledWith([
        '--projects',
        expect.stringContaining('project-type.js'),
        expect.stringContaining('project-lint.js'),
        expect.stringContaining('project-unit.js'),
      ])

      expect(result).toEqual({code: 0})
    })

    it('calls jest with args and returns success when valid modes are passed', async() => {
      const result = await testCommand({modes: ['unit']})

      expect(runJest).toHaveBeenCalledWith([
        '--projects',
        expect.stringContaining('project-unit.js'),
      ])

      expect(result).toEqual({code: 0})
    })
  })

  describe('watch', () => {
    it('calls jest with args and returns success when no watch flag is passed', async() => {
      const result = await testCommand({modes: ['type']})

      expect(runJest).toHaveBeenCalledWith([
        '--projects',
        expect.stringContaining('project-type.js'),
      ])

      expect(result).toEqual({code: 0})
    })

    it('calls jest with args and returns success when watch flag is passed', async() => {
      const result = await testCommand({watch: true, modes: ['lint']})

      expect(runJest).toHaveBeenCalledWith([
        '--watch',
        '--projects',
        expect.stringContaining('project-lint.js'),
      ])

      expect(result).toEqual({code: 0})
    })
  })
})
