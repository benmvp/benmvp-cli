import start from '..'
import runJest from '../../test/run-jest'
import {TestMode} from '../../types'

jest.mock('../../test/run-jest')

const mockedRunJest = runJest as jest.Mock

describe('error cases', () => {
  it('returns an error w/ empty modes', async () => {
    const result = await start({modes: []})

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })

  it('returns an error w/ invalid mode', async () => {
    const DUMMY_MODE = 'foo' as TestMode
    const result = await start({modes: [DUMMY_MODE]})

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })
  })

  it('returns an error if jest fails (for some reason)', async () => {
    mockedRunJest.mockResolvedValue(Promise.reject(new Error('Jest failed!')))
    const result = await start({modes: ['unit']})

    expect(result).toEqual({
      code: 1,
      message: expect.any(String),
      error: expect.any(Error),
    })

    mockedRunJest.mockReset()
  })
})

describe('success cases', () => {
  afterEach(() => {
    mockedRunJest.mockReset()
  })

  describe('modes', () => {
    it('calls jest with args and returns success when no modes are passed', async () => {
      const result = await start({})

      expect(runJest).toHaveBeenCalledWith(expect.arrayContaining(['--watch']))
      expect(runJest).toHaveBeenCalledWith(expect.arrayContaining([
        '--projects',
        expect.stringContaining('project-type.js'),
        expect.stringContaining('project-lint.js'),
        expect.stringContaining('project-unit.js'),
      ]))

      expect(result).toEqual({code: 0})
    })

    it('calls jest with args and returns success when valid modes are passed', async () => {
      const result = await start({modes: ['unit']})

      expect(runJest).toHaveBeenCalledWith(expect.arrayContaining(['--watch']))
      expect(runJest).toHaveBeenCalledWith(expect.arrayContaining([
        '--projects',
        expect.stringContaining('project-unit.js'),
      ]))

      expect(result).toEqual({code: 0})
    })
  })
})
