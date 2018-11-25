import {run} from '../'
import {create} from '../../commands'
import {CREATE_ARGS, CREATE_POS_ARGS} from '../args'

jest.mock('../../commands')

afterEach(() => {
  const creatMock = create as jest.Mock

  creatMock.mockReset()
})

describe('run', () => {
  describe('unknown commands', () => {
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

      it('parses user-relative path', () => {
        run(['create', '-o', '~/github/benmvp-cli/built'])

        expect(create).toBeCalledWith({
          name: CREATE_POS_ARGS.name.default,
          formats: CREATE_ARGS.formats.default,
          out: '~/github/benmvp-cli/built',
          modes: CREATE_ARGS.modes.default,
        })
      })

      it('parses absolute path', () => {
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

  describe('build command', () => {})

  describe('test command', () => {})

  describe('start command', () => {})
})
