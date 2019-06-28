import {run} from '..'
import {
  create,
  build,
  test as testCommand,
  start,
  integrate,
} from '../../commands'
import {
  CREATE_ARGS,
  CREATE_POS_ARGS,
  BUILD_ARGS,
  TEST_ARGS,
  START_ARGS,
  INTEGRATE_ARGS,
} from '../args'

jest.mock('../../commands')

describe('run', () => {
  describe('unknown commands', () => {
    afterEach(() => {
      const creatMock = create as jest.Mock

      creatMock.mockReset()
    })

    it('defaults to create command when no args passed', () => {
      run()

      expect(create).toHaveBeenCalledWith({
        name: CREATE_POS_ARGS.name.default,
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    it('defaults to create command when empty args are passed', () => {
      run([])

      expect(create).toHaveBeenCalledWith({
        name: CREATE_POS_ARGS.name.default,
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    it('parses unknown command as name for default create command', () => {
      run(['foo'])

      expect(create).toHaveBeenCalledWith({
        name: 'foo',
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })
  })

  describe('create command', () => {
    afterEach(() => {
      const createMock = create as jest.Mock

      createMock.mockReset()
    })

    it('defaults args when none are passed', () => {
      run(['create'])

      expect(create).toHaveBeenCalledWith({
        name: CREATE_POS_ARGS.name.default,
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    it('parses lib name', () => {
      run(['create', 'lib-name'])

      expect(create).toHaveBeenCalledWith({
        name: 'lib-name',
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    describe('formats', () => {
      it('parses singular format', () => {
        run(['create', '--formats', 'esm'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['esm'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses singular format (alias)', () => {
        run(['create', '-f', 'cjs'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['cjs'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses plural format', () => {
        run(['create', '--formats', 'esm', 'cjs'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['esm', 'cjs'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses plural format (alias)', () => {
        run(['create', '-f', 'type', 'esm'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['type', 'esm'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })
    })

    describe('output path', () => {
      it('parses relative path', () => {
        run(['create', '--out', './built'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: './built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses user-relative path', () => {
        run(['create', '--out', '~/github/benmvp-cli/built'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses absolute path', () => {
        run(['create', '--out', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses relative path (alias)', () => {
        run(['create', '-o', './built'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: './built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses user-relative path (alias)', () => {
        run(['create', '-o', '~/github/benmvp-cli/built'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses absolute path (alias)', () => {
        run(['create', '-o', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })
    })

    describe('test modes', () => {
      it('parses singular mode', () => {
        run(['create', '--modes', 'lint'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['lint'],
        })
      })

      it('parses multiple modes', () => {
        run(['create', '--modes', 'lint', 'spec'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['lint', 'spec'],
        })
      })

      it('parses singular mode (alias)', () => {
        run(['create', '-m', 'type'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['type'],
        })
      })

      it('parses multiple modes (alias)', () => {
        run(['create', '-m', 'lint', 'spec'])

        expect(create).toHaveBeenCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['lint', 'spec'],
        })
      })
    })

    describe('combination', () => {
      it('parses multiple arguments', () => {
        run([
          'create',
          'new-lib',
          '--modes',
          'lint',
          'spec',
          '--out',
          './output',
          '--formats',
          'esm',
          'cjs',
        ])

        expect(create).toHaveBeenCalledWith({
          name: 'new-lib',
          formats: ['esm', 'cjs'],
          out: './output',
          modes: ['lint', 'spec'],
        })
      })

      it('parses multiple arguments (aliases)', () => {
        run(['create', 'test-lib', '-m', 'type', '-o', './built', '-f', 'esm', 'type'])

        expect(create).toHaveBeenCalledWith({
          name: 'test-lib',
          formats: ['esm', 'type'],
          out: './built',
          modes: ['type'],
        })
      })
    })
  })

  describe('build command', () => {
    afterEach(() => {
      const buildMock = build as jest.Mock

      buildMock.mockReset()
    })
    it('defaults args when none are passed', () => {
      run(['build'])

      expect(build).toHaveBeenCalledWith({
        formats: BUILD_ARGS.formats.default,
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })
    })

    describe('formats', () => {
      it('parses singular format', () => {
        run(['build', '--formats', 'esm'])

        expect(build).toHaveBeenCalledWith({
          formats: ['esm'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses singular format (alias)', () => {
        run(['build', '-f', 'cjs'])

        expect(build).toHaveBeenCalledWith({
          formats: ['cjs'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses plural format', () => {
        run(['build', '--formats', 'esm', 'cjs'])

        expect(build).toHaveBeenCalledWith({
          formats: ['esm', 'cjs'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses plural format (alias)', () => {
        run(['build', '-f', 'type', 'esm'])

        expect(build).toHaveBeenCalledWith({
          formats: ['type', 'esm'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })
    })

    describe('output path', () => {
      it('parses relative path', () => {
        run(['build', '--out', './built'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: './built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses user-relative path', () => {
        run(['build', '--out', '~/github/benmvp-cli/built'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses absolute path', () => {
        run(['build', '--out', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses relative path (alias)', () => {
        run(['build', '-o', './built'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: './built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses user-relative path (alias)', () => {
        run(['build', '-o', '~/github/benmvp-cli/built'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses absolute path (alias)', () => {
        run(['build', '-o', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })
    })

    describe('watch', () => {
      it('parses when present', () => {
        run(['build', '--watch'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })

      it('parses when present & true', () => {
        run(['build', '--watch', 'true'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })
      it('parses when present & false', () => {
        run(['build', '--watch', 'false'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: false,
        })
      })

      it('parses when present (alias)', () => {
        run(['build', '-w'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })

      it('parses when present & true (alias)', () => {
        run(['build', '-w', 'true'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })
      it('parses when present & false (alias)', () => {
        run(['build', '-w', 'false'])

        expect(build).toHaveBeenCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: false,
        })
      })
    })

    describe('combination', () => {
      it('parses multiple arguments', () => {
        run(['build', '--out', './output', '--watch', '--formats', 'esm', 'cjs'])

        expect(build).toHaveBeenCalledWith({
          formats: ['esm', 'cjs'],
          out: './output',
          watch: true,
        })
      })

      it('parses multiple arguments (aliases)', () => {
        run(['build', '-w', '-o', './built', '-f', 'cjs', 'type'])

        expect(build).toHaveBeenCalledWith({
          formats: ['cjs', 'type'],
          out: './built',
          watch: true,
        })
      })
    })
  })

  describe('test command', () => {
    afterEach(() => {
      const testMock = testCommand as jest.Mock

      testMock.mockReset()
    })

    it('defaults args when none are passed', () => {
      run(['test'])

      expect(testCommand).toHaveBeenCalledWith({
        modes: TEST_ARGS.modes.default,
        pattern: TEST_ARGS.pattern.default,
        watch: TEST_ARGS.watch.default,
      })
    })

    describe('test modes', () => {
      it('parses singular mode', () => {
        run(['test', '--modes', 'lint'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: ['lint'],
          pattern: TEST_ARGS.pattern.default,
          watch: TEST_ARGS.watch.default,
        })
      })

      it('parses multiple modes', () => {
        run(['test', '--modes', 'lint', 'spec'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: ['lint', 'spec'],
          pattern: TEST_ARGS.pattern.default,
          watch: TEST_ARGS.watch.default,
        })
      })

      it('parses singular mode (alias)', () => {
        run(['test', '-m', 'type'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: ['type'],
          pattern: TEST_ARGS.pattern.default,
          watch: TEST_ARGS.watch.default,
        })
      })

      it('parses multiple modes (alias)', () => {
        run(['test', '-m', 'lint', 'spec'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: ['lint', 'spec'],
          pattern: TEST_ARGS.pattern.default,
          watch: TEST_ARGS.watch.default,
        })
      })

      it('parses pattern', () => {
        const pattern = 'api/'

        run(['test', '--pattern', pattern])

        expect(testCommand).toHaveBeenCalledWith({
          modes: TEST_ARGS.modes.default,
          pattern,
          watch: TEST_ARGS.watch.default,
        })
      })

      it('parses pattern (alias)', () => {
        const pattern = 'api/'

        run(['test', '-p', pattern])

        expect(testCommand).toHaveBeenCalledWith({
          modes: TEST_ARGS.modes.default,
          pattern,
          watch: TEST_ARGS.watch.default,
        })
      })

      it('parses watch', () => {
        run(['test', '--watch'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: TEST_ARGS.modes.default,
          pattern: TEST_ARGS.pattern.default,
          watch: true,
        })
      })

      it('parses watch (alias)', () => {
        run(['test', '-w'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: TEST_ARGS.modes.default,
          pattern: TEST_ARGS.pattern.default,
          watch: true,
        })
      })

      it('parses all args', () => {
        run(['test', '--watch', '--modes', 'spec', 'type', '--pattern', 'utils/'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: ['spec', 'type'],
          pattern: 'utils/',
          watch: true,
        })
      })

      it('parses all args (aliases)', () => {
        run(['test', '-p', 'utils/', '-m', 'type', 'lint', '-w'])

        expect(testCommand).toHaveBeenCalledWith({
          modes: ['type', 'lint'],
          pattern: 'utils/',
          watch: true,
        })
      })
    })
  })

  describe('start command', () => {
    afterEach(() => {
      const startMock = start as jest.Mock

      startMock.mockReset()
    })

    it('defaults args when none are passed', () => {
      run(['start'])

      expect(start).toHaveBeenCalledWith({
        modes: START_ARGS.modes.default,
        pattern: START_ARGS.pattern.default,
      })
    })

    describe('start modes', () => {
      it('parses singular mode', () => {
        run(['start', '--modes', 'lint'])

        expect(start).toHaveBeenCalledWith({
          modes: ['lint'],
          pattern: START_ARGS.pattern.default,
        })
      })

      it('parses multiple modes', () => {
        run(['start', '--modes', 'lint', 'spec'])

        expect(start).toHaveBeenCalledWith({
          modes: ['lint', 'spec'],
          pattern: START_ARGS.pattern.default,
        })
      })

      it('parses singular mode (alias)', () => {
        run(['start', '-m', 'type'])

        expect(start).toHaveBeenCalledWith({
          modes: ['type'],
          pattern: START_ARGS.pattern.default,
        })
      })

      it('parses multiple modes (alias)', () => {
        run(['start', '-m', 'lint', 'spec'])

        expect(start).toHaveBeenCalledWith({
          modes: ['lint', 'spec'],
          pattern: START_ARGS.pattern.default,
        })
      })


      it('parses pattern', () => {
        const pattern = 'api/'

        run(['start', '--pattern', pattern])

        expect(start).toHaveBeenCalledWith({
          modes: START_ARGS.modes.default,
          pattern,
        })
      })

      it('parses pattern (alias)', () => {
        const pattern = 'api/'

        run(['start', '-p', pattern])

        expect(start).toHaveBeenCalledWith({
          modes: START_ARGS.modes.default,
          pattern,
        })
      })
    })
  })

  describe('integrate command', () => {
    afterEach(() => {
      const integrateMock = integrate as jest.Mock

      integrateMock.mockReset()
    })

    it('defaults args when none are passed', () => {
      run(['integrate'])

      expect(integrate).toHaveBeenCalledWith({
        modes: INTEGRATE_ARGS.modes.default,
        pattern: INTEGRATE_ARGS.pattern.default,
      })
    })

    describe('integrate modes', () => {
      it('parses singular mode', () => {
        run(['integrate', '--modes', 'lint'])

        expect(integrate).toHaveBeenCalledWith({
          modes: ['lint'],
          pattern: INTEGRATE_ARGS.pattern.default,
        })
      })

      it('parses multiple modes', () => {
        run(['integrate', '--modes', 'lint', 'spec'])

        expect(integrate).toHaveBeenCalledWith({
          modes: ['lint', 'spec'],
          pattern: INTEGRATE_ARGS.pattern.default,
        })
      })

      it('parses singular mode (alias)', () => {
        run(['integrate', '-m', 'type'])

        expect(integrate).toHaveBeenCalledWith({
          modes: ['type'],
          pattern: INTEGRATE_ARGS.pattern.default,
        })
      })

      it('parses multiple modes (alias)', () => {
        run(['integrate', '-m', 'lint', 'spec'])

        expect(integrate).toHaveBeenCalledWith({
          modes: ['lint', 'spec'],
          pattern: INTEGRATE_ARGS.pattern.default,
        })
      })


      it('parses pattern', () => {
        const pattern = 'api/'

        run(['integrate', '--pattern', pattern])

        expect(integrate).toHaveBeenCalledWith({
          modes: INTEGRATE_ARGS.modes.default,
          pattern,
        })
      })

      it('parses pattern (alias)', () => {
        const pattern = 'api/'

        run(['integrate', '-p', pattern])

        expect(integrate).toHaveBeenCalledWith({
          modes: INTEGRATE_ARGS.modes.default,
          pattern,
        })
      })
    })
  })
})
