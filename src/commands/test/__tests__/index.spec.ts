import testCommand from '..'
import runJest from '../run-jest'
import { TestMode } from '../../types'

jest.mock('../run-jest')

const mockedRunJest = runJest as jest.Mock

describe('error cases', () => {
  afterEach(() => {
    mockedRunJest.mockReset()
  })

  it('returns an error w/ empty modes', async () => {
    const result = await testCommand({ modes: [] })

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })

  it('returns an error w/ invalid mode', async () => {
    const DUMMY_MODE = 'foo' as TestMode
    const result = await testCommand({ modes: [DUMMY_MODE] })

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })

  it('returns an error if jest fails (for some reason)', async () => {
    mockedRunJest.mockResolvedValue(Promise.reject(new Error('Jest failed!')))
    const result = await testCommand({ modes: ['spec'] })

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })
})

describe('success cases', () => {
  afterEach(() => {
    mockedRunJest.mockReset()
  })

  describe('modes', () => {
    it('calls jest with args and returns success when no modes are passed', async () => {
      const result = await testCommand({})

      expect(runJest).toHaveBeenCalledWith(
        expect.arrayContaining([
          '--projects',
          expect.stringContaining('project-type.js'),
          expect.stringContaining('project-lint.js'),
          expect.stringContaining('project-spec.js'),
        ]),
      )

      expect(result).toEqual({ code: 0 })
    })

    it('calls jest with args and returns success when valid modes are passed', async () => {
      const result = await testCommand({ modes: ['spec'] })

      expect(runJest).toHaveBeenCalledWith(
        expect.arrayContaining([
          '--projects',
          expect.stringContaining('project-spec.js'),
        ]),
      )

      expect(result).toEqual({ code: 0 })
    })
  })

  describe('pattern', () => {
    it('calls jest with args and returns success when no pattern is passed', async () => {
      const result = await testCommand()

      expect(runJest).toHaveBeenCalledWith(
        expect.not.arrayContaining(['--pattern']),
      )

      expect(result).toEqual({ code: 0 })
    })

    it('calls jest with args and returns success when pattern flag is passed', async () => {
      const pattern = 'utils/'
      const result = await testCommand({ pattern })

      expect(runJest).toHaveBeenCalledWith(
        expect.arrayContaining(['--testPathPattern', pattern]),
      )

      expect(result).toEqual({ code: 0 })
    })
  })

  describe('watch', () => {
    it('calls jest with args and returns success when no watch flag is passed', async () => {
      const result = await testCommand()

      expect(runJest).toHaveBeenCalledWith(
        expect.not.arrayContaining(['--watch']),
      )

      expect(result).toEqual({ code: 0 })
    })

    it('calls jest with args and returns success when watch flag is passed', async () => {
      const result = await testCommand({ watch: true })

      expect(runJest).toHaveBeenCalledWith(expect.arrayContaining(['--watch']))

      expect(result).toEqual({ code: 0 })
    })
  })

  describe('ci', () => {
    it('calls jest with --ci flag and returns success when CI env is set', async () => {
      const origEnvCI = process.env.CI

      process.env.CI = 'true'

      const result = await testCommand()

      expect(runJest).toHaveBeenCalledWith(expect.arrayContaining(['--ci']))

      expect(result).toEqual({ code: 0 })

      process.env.CI = origEnvCI
    })
  })
})
