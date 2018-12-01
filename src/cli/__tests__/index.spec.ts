import {run} from '../'
import {create, build, test, start} from '../../commands'
import {CREATE_ARGS, CREATE_POS_ARGS, BUILD_ARGS, TEST_ARGS, START_ARGS} from '../args'

jest.mock('../../commands')

describe('run', () => {
  describe('unknown commands', () => {
    afterEach(() => {
      const creatMock = create as jest.Mock

      creatMock.mockReset()
    })

    it('defaults to create command when no args passed', () => {
      run()

      expect(create).toBeCalledWith({
        name: CREATE_POS_ARGS.name.default,
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    it('defaults to create command when empty args are passed', () => {
      run([])

      expect(create).toBeCalledWith({
        name: CREATE_POS_ARGS.name.default,
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    it('parses unknown command as name for default create command', () => {
      run(['foo'])

      expect(create).toBeCalledWith({
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

      expect(create).toBeCalledWith({
        name: CREATE_POS_ARGS.name.default,
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    it('parses lib name', () => {
      run(['create', 'lib-name'])

      expect(create).toBeCalledWith({
        name: 'lib-name',
        formats: CREATE_ARGS.formats.default,
        out: CREATE_ARGS.out.default,
        modes: CREATE_ARGS.modes.default,
      })
    })

    describe('formats', () => {
      it('parses singular format', () => {
        run(['create', '--formats', 'esm'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['esm'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses singular format (alias)', () => {
        run(['create', '-f', 'dist'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['dist'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses plural format', () => {
        run(['create', '--formats', 'esm', 'umd'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: ['esm', 'umd'],
          out: CREATE_ARGS.out.default,
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses singular format (alias)', () => {
        run(['create', '-f', 'type', 'esm'])

        expect(create).toBeCalledWith({
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

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: './built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses user-relative path', () => {
        run(['create', '--out', '~/github/benmvp-cli/built'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses absolute path', () => {
        run(['create', '--out', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses relative path (alias)', () => {
        run(['create', '-o', './built'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: './built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses user-relative path (alias)', () => {
        run(['create', '-o', '~/github/benmvp-cli/built'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses absolute path (alias)', () => {
        run(['create', '-o', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(create).toBeCalledWith({
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

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['lint'],
        })
      })

      it('parses multiple modes', () => {
        run(['create', '--modes', 'lint', 'unit'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['lint', 'unit'],
        })
      })

      it('parses singular mode (alias)', () => {
        run(['create', '-m', 'type'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['type'],
        })
      })

      it('parses multiple modes (alias)', () => {
        run(['create', '-m', 'lint', 'unit'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: CREATE_ARGS.out.default,
          modes: ['lint', 'unit'],
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
          'unit',
          '--out',
          './output',
          '--formats',
          'esm',
          'umd',
        ])

        expect(create).toBeCalledWith({
          name: 'new-lib',
          formats: ['esm', 'umd'],
          out: './output',
          modes: ['lint', 'unit'],
        })
      })

      it('parses multiple arguments (aliases)', () => {
        run(['create', 'test-lib', '-m', 'type', '-o', './built', '-f', 'dist', 'type'])

        expect(create).toBeCalledWith({
          name: 'test-lib',
          formats: ['dist', 'type'],
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

      expect(build).toBeCalledWith({
        formats: BUILD_ARGS.formats.default,
        out: BUILD_ARGS.out.default,
        watch: BUILD_ARGS.watch.default,
      })
    })

    describe('formats', () => {
      it('parses singular format', () => {
        run(['build', '--formats', 'esm'])

        expect(build).toBeCalledWith({
          formats: ['esm'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses singular format (alias)', () => {
        run(['build', '-f', 'dist'])

        expect(build).toBeCalledWith({
          formats: ['dist'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses plural format', () => {
        run(['build', '--formats', 'esm', 'umd'])

        expect(build).toBeCalledWith({
          formats: ['esm', 'umd'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses singular format (alias)', () => {
        run(['build', '-f', 'type', 'esm'])

        expect(build).toBeCalledWith({
          formats: ['type', 'esm'],
          out: BUILD_ARGS.out.default,
          watch: BUILD_ARGS.watch.default,
        })
      })
    })

    describe('output path', () => {
      it('parses relative path', () => {
        run(['build', '--out', './built'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: './built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses user-relative path', () => {
        run(['build', '--out', '~/github/benmvp-cli/built'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses absolute path', () => {
        run(['build', '--out', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses relative path (alias)', () => {
        run(['build', '-o', './built'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: './built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses user-relative path (alias)', () => {
        run(['build', '-o', '~/github/benmvp-cli/built'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })

      it('parses absolute path (alias)', () => {
        run(['build', '-o', '/Users/foo.bar/github/benmvp-cli/built'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: '/Users/foo.bar/github/benmvp-cli/built',
          watch: BUILD_ARGS.watch.default,
        })
      })
    })

    describe('watch', () => {
      it('parses when present', () => {
        run(['build', '--watch'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })

      it('parses when present & true', () => {
        run(['build', '--watch', 'true'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })
      it('parses when present & false', () => {
        run(['build', '--watch', 'false'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: false,
        })
      })

      it('parses when present (alias)', () => {
        run(['build', '-w'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })

      it('parses when present & true (alias)', () => {
        run(['build', '-w', 'true'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: true,
        })
      })
      it('parses when present & false (alias)', () => {
        run(['build', '-w', 'false'])

        expect(build).toBeCalledWith({
          formats: BUILD_ARGS.formats.default,
          out: BUILD_ARGS.out.default,
          watch: false,
        })
      })
    })

    describe('combination', () => {
      it('parses multiple arguments', () => {
        run(['build', '--out', './output', '--watch', '--formats', 'esm', 'umd'])

        expect(build).toBeCalledWith({
          formats: ['esm', 'umd'],
          out: './output',
          watch: true,
        })
      })

      it('parses multiple arguments (aliases)', () => {
        run(['build', '-w', '-o', './built', '-f', 'dist', 'type'])

        expect(build).toBeCalledWith({
          formats: ['dist', 'type'],
          out: './built',
          watch: true,
        })
      })
    })
  })

  describe('test command', () => {
    afterEach(() => {
      const testMock = test as jest.Mock

      testMock.mockReset()
    })

    it('defaults args when none are passed', () => {
      run(['test'])

      expect(test).toBeCalledWith({
        modes: TEST_ARGS.modes.default,
      })
    })

    describe('test modes', () => {
      it('parses singular mode', () => {
        run(['test', '--modes', 'lint'])

        expect(test).toBeCalledWith({
          modes: ['lint'],
        })
      })

      it('parses multiple modes', () => {
        run(['test', '--modes', 'lint', 'unit'])

        expect(test).toBeCalledWith({
          modes: ['lint', 'unit'],
        })
      })

      it('parses singular mode (alias)', () => {
        run(['test', '-m', 'type'])

        expect(test).toBeCalledWith({
          modes: ['type'],
        })
      })

      it('parses multiple modes (alias)', () => {
        run(['test', '-m', 'lint', 'unit'])

        expect(test).toBeCalledWith({
          modes: ['lint', 'unit'],
        })
      })
    })
  })

  describe('start command', () => {
    afterEach(() => {
      const startMock = test as jest.Mock

      startMock.mockReset()
    })

    it('defaults args when none are passed', () => {
      run(['start'])

      expect(start).toBeCalledWith({modes: START_ARGS.modes.default})
    })

    describe('start modes', () => {
      it('parses singular mode', () => {
        run(['start', '--modes', 'lint'])

        expect(start).toBeCalledWith({modes: ['lint']})
      })

      it('parses multiple modes', () => {
        run(['start', '--modes', 'lint', 'unit'])

        expect(start).toBeCalledWith({modes: ['lint', 'unit']})
      })

      it('parses singular mode (alias)', () => {
        run(['start', '-m', 'type'])

        expect(start).toBeCalledWith({modes: ['type']})
      })

      it('parses multiple modes (alias)', () => {
        run(['start', '-m', 'lint', 'unit'])

        expect(start).toBeCalledWith({modes: ['lint', 'unit']})
      })
    })
  })
})
