# `benmvp build` Documentation

Builds the library into the desired module formats at the specified location.

Looking for Node API docs? View companion [`build()` documentation](../api/build.md).

## Examples

Build module formats in default output directory:

```sh
benmvp build
```

To specify an alternate output directory:

```sh
benmvp build --out ./built
```

NOTE: You will need to manually update the default `"main"`, `"module"`, `"jsnext:main"`, `"browser"`, and `"types"` properties in your `package.json` to reflect the new location of the built module formats.

To exclude bundled web distribution format:

```sh
benmvp build --formats esm umd type
```

To put ESM & web distribution formats in an alternate build location with continuous watch:

```sh
benmvp build --formats esm dist --out ./built --watch
```

## Arguments

### `--formats`

A space-separated list of the module formats to build. Aliased as `-f`. Available formats:

- `type` - Typescript definition files (`.d.ts`) so that clients of your library can use your library fully-typed
- `esm` - ECMAScript module format (everything transpiled to ES5 except for ES2015 `import`/`export` statements enabling [_tree shaking_](https://webpack.js.org/guides/tree-shaking/))
- `umd` - Universal module definition format (Combination of CommonJS & AMD fully transpiled to ES5 w/ a minified version)
- `dist` - Bundled web distribution (`<script>` include fully transpiled to ES5 w/ a minified version)

Optional. Defaults to all formats.

### `--out`

A path (relative or absolute) to the output directory for the built module formats. Aliased as `-o`.

If you chose `'esm'` as one of the [`formats`](#formats) and choose `'./built'` as the output directory, the ESM files will live at `./built/esm`.

Optional. Defaults to the current working directory.

### `--watch`

A flag indicating whether or not to continuously generate the built module formats whenever source files change. This is most useful if you've linked your library into a host application (with [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) or [`npm link`](https://docs.npmjs.com/cli/link)). Aliased as `-w`.

Optional. Defaults to `false`.

---

## More help

Looking for Node API docs? View companion [`build()` documentation](../api/build.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
