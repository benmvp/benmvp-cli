# `build()` Documentation

Builds the library into the desired module formats at the specified location, returning a `Promise` indicating whether the build succeeded or failed.

Looking for CLI docs? View companion [`benmvp build` documentation](../cli/build.md).

## Examples

Build module formats in default output directory:

```js
import {build} from '@benmvp/cli'

build()
```

To specify an alternate output directory:

```js
import {build} from '@benmvp/cli'

build({out: './built'})
```

To exclude bundled web distribution format:

```js
import {build} from '@benmvp/cli'

build({
  formats: ['esm', 'umd', 'type'],
})
```

To put ESM & web distribution formats in an alternate build location with continuous watch:

```js
import {build} from '@benmvp/cli'

build({
  formats: ['esm', 'dist'],
  out: ['./built'],
  watch: true,
})
```

## Type

`build()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
([options]: Options): Promise<Result>
```

## Options

The optional `Options` object supports the following properties:

### `formats`

An `Array` of the module formats to build. Available formats:

- `'type'` - Typescript definition files (`.d.ts`) so that clients of your library can use your library fully-typed
- `'esm'` - ECMAScript module format (everything transpiled to ES5 except for ES2015 `import`/`export` statements enabling [_tree shaking_](https://webpack.js.org/guides/tree-shaking/))
- `'umd'` - Universal module definition format (Combination of CJS & AMD (asynchronous module definition) fully transpiled to ES5 includes minified version)
- `'dist'` - Bundled web distribution (`<script>` include fully transpiled to ES5 w/ a minified version)

Optional. Defaults to all formats.

### `out`

A path (relative or absolute) to the output directory for where the module formats should be built.

If you chose `'esm'` as one of the [`formats`](#formats) and choose `'./built'` as the output directory, the ESM files will live at `./built/esm`.

Optional. Defaults to the current working directory (`.`).

### `watch`

A flag indicating whether or not to continuously generate the built module formats whenever source files change. This is most useful if you've linked your library into a host application (with [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) or [`npm link`](https://docs.npmjs.com/cli/link)).

Optional. Defaults to `false`.

## Return Value

`build()` returns a `Promise`.

When `build()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`. If [`watch`](#watch) is set to `true`, the `Promise` will not resolve until the watcher is stopped.

If `build()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp build` documentation](../cli/build.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
