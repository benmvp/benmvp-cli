import { CREATE_ARGS, CREATE_POS_ARGS } from '../../../cli/args'
import { getUpdatePackageInfo } from '../utils'

const DEFAULT_ARGS = {
  libraryName: CREATE_POS_ARGS.name.default,
  formats: CREATE_ARGS.formats.default,
  out: CREATE_ARGS.out.default,
  modes: CREATE_ARGS.modes.default,
}

describe('getUpdatePackageInfo', () => {
  describe('"name" property', () => {
    it('leaves "name" as-is if `libraryName` is not specified', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: 'original-name', version: '1.0.0' },
        DEFAULT_ARGS,
      )

      expect(updatedPackageInfo).toHaveProperty('name', 'original-name')
    })

    it('overwrites "name" if `libraryName` is specified', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: 'original-name', version: '1.0.0' },
        { ...DEFAULT_ARGS, libraryName: 'new-name' },
      )

      expect(updatedPackageInfo).toHaveProperty('name', 'new-name')
    })
  })

  describe('build-related fields', () => {
    it('adds relevant fields when initially empty', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        DEFAULT_ARGS,
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        main: 'lib/cjs/index.js',
        module: 'lib/esm/index.js',
        'jsnext:main': 'lib/esm/index.js',
        types: 'lib/types/index.d.ts',
        files: ['lib'],
        scripts: {
          build: 'benmvp build',
        },
      })
    })

    it('overwrites fields pre-existing fields', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        {
          name: '@benmvp/lib-name',
          version: '0.0.0-semantically-released',
          main: 'out/cjs/index.js',
          types: 'out/types/index.d.ts',
          files: ['out'],
          scripts: {
            start: 'benmvp start',
            test: 'benmvp test',
            build: 'benmvp build --out ./out',
            integrate: 'benmvp integrate',
          },
        },
        { ...DEFAULT_ARGS, formats: ['esm', 'cjs', 'type'] },
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        main: 'lib/cjs/index.js',
        module: 'lib/esm/index.js',
        'jsnext:main': 'lib/esm/index.js',
        types: 'lib/types/index.d.ts',
        files: ['lib'],
        scripts: {
          start: 'benmvp start',
          test: 'benmvp test',
          build: 'benmvp build',
          integrate: 'benmvp integrate',
        },
      })
    })

    it('uses `out` argument path when it is specified', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        { ...DEFAULT_ARGS, formats: ['esm', 'cjs', 'type'], out: './out/path' },
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        main: 'out/path/cjs/index.js',
        module: 'out/path/esm/index.js',
        'jsnext:main': 'out/path/esm/index.js',
        types: 'out/path/types/index.d.ts',
        files: ['out/path'],
        scripts: {
          // formats are excluded because they match the default
          build: 'benmvp build --out ./out/path',
        },
      })
    })
    it('excludes "types" field when `type` format argument is excluded', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        { ...DEFAULT_ARGS, formats: ['esm', 'cjs'] },
      )

      expect(updatedPackageInfo).not.toHaveProperty('types')
      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        main: 'lib/cjs/index.js',
        module: 'lib/esm/index.js',
        'jsnext:main': 'lib/esm/index.js',
        files: ['lib'],
        scripts: {
          build: 'benmvp build --formats esm cjs',
        },
      })
    })
    it('excludes "main" field when `cjs` format argument is excluded', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        { ...DEFAULT_ARGS, formats: ['esm', 'type'] },
      )

      expect(updatedPackageInfo).not.toHaveProperty('main')
      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        module: 'lib/esm/index.js',
        'jsnext:main': 'lib/esm/index.js',
        types: 'lib/types/index.d.ts',
        files: ['lib'],
        scripts: {
          build: 'benmvp build --formats esm type',
        },
      })
    })
    it('excludes "module" & "jsnext:main" fields when argument `esm` format is excluded', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        { ...DEFAULT_ARGS, formats: ['cjs', 'type'], out: './built' },
      )

      expect(updatedPackageInfo).not.toHaveProperty('module')
      expect(updatedPackageInfo).not.toHaveProperty('jsnext:main')
      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        main: 'built/cjs/index.js',
        types: 'built/types/index.d.ts',
        files: ['built'],
        scripts: {
          build: 'benmvp build --formats cjs type --out ./built',
        },
      })
    })
  })

  describe('test-related fields', () => {
    it('adds relevant fields when initially empty', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        DEFAULT_ARGS,
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        scripts: {
          start: 'benmvp start',
          test: 'benmvp test',
          build: 'benmvp build',
          integrate: 'benmvp integrate',
        },
      })
    })

    it('overwrites fields pre-existing fields', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        {
          name: '@benmvp/lib-name',
          version: '0.0.0-semantically-released',
          scripts: {
            start: 'benmvp start -m lint',
            test: 'benmvp test --modes spec',
            build: 'benmvp build',
            integrate: 'benmvp test --modes type',
          },
        },
        { ...DEFAULT_ARGS, modes: ['lint', 'spec', 'type'] },
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        scripts: {
          start: 'benmvp start',
          test: 'benmvp test',
          build: 'benmvp build',
          integrate: 'benmvp integrate',
        },
      })
    })

    it('passes modes argument to "start", "test" & "integrate" scripts', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        {
          ...DEFAULT_ARGS,
          modes: ['lint', 'type'],
        },
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        scripts: {
          start: 'benmvp start --modes lint type',
          test: 'benmvp test --modes lint type',
          build: 'benmvp build',
          integrate: 'benmvp integrate --modes lint type',
        },
      })
    })
  })

  describe('misc properties', () => {
    it('adds missing', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        { name: '@benmvp/lib-name', version: '1.0.0' },
        DEFAULT_ARGS,
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        license: 'MIT',
        publishConfig: {
          access: 'public',
        },
        engines: {
          node: '>= 8',
        },
      })
    })

    it('overwrites existing', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        {
          name: '@benmvp/lib-name',
          version: '1.0.0',
          license: 'ISC',
          publishConfig: { access: 'restricted' },
          engines: { node: '>= 6' },
        },
        DEFAULT_ARGS,
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        license: 'MIT',
        publishConfig: {
          access: 'public',
        },
        engines: {
          node: '>= 8',
        },
      })
    })

    it('merges into existing objects', () => {
      const updatedPackageInfo = getUpdatePackageInfo(
        {
          name: '@benmvp/lib-name',
          version: '1.0.0',
          publishConfig: { tag: 'latest' },
          engines: { yarn: '^1.15.2' },
          bin: {
            hello: 'bin/hello',
          },
          dependencies: {
            react: '^16.9.0',
            'react-dom': '^16.9.0',
          },
          devDependencies: {
            '@benmvp/cli': '^6.0.0',
            '@types/react': '^16.9.2',
            '@types/react-dom': '^16.8.5',
          },
        },
        DEFAULT_ARGS,
      )

      expect(updatedPackageInfo).toMatchObject({
        name: '@benmvp/lib-name',
        version: '0.0.0-semantically-released',
        publishConfig: {
          tag: 'latest',
        },
        engines: {
          yarn: '^1.15.2',
          node: '>= 8',
        },
        bin: {
          hello: 'bin/hello',
        },
        dependencies: {
          react: '^16.9.0',
          'react-dom': '^16.9.0',
        },
        devDependencies: {
          '@benmvp/cli': '^6.0.0',
          '@types/react': '^16.9.2',
          '@types/react-dom': '^16.8.5',
        },
      })
    })
  })
})
