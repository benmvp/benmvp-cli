# `create()` Documentation

> NOTE: `create()` is still under development

Creates a new library with the specified name set up with infrastructure using `@benmvp/cli`, returning a `Promise` indicating whether the creation succeeded or failed.

It will:

- Add `"test"`, `"start"`, `"build"` and `"integrate"` scripts in the `package.json` to call [`benmvp test`](test.md), [`benmvp start`](start.md), [`benmvp build`](build.md), and [`benmvp integrate`](integrate.md), respectively
- After the `package.json` is created (or updated), it will install `@benmvp/cli` as a dev dependency, using [Yarn](https://yarnpkg.com/) if available. If Yarn is unavailable, it will fallback to [npm](https://docs.npmjs.com/)
- Add (or overwrite) `.prettierrc.json`, `.prettierignore` & `.vscode/settings.json` files to format all code
- Add (or overwrite) a `.github/workflows/ci.yml` [Github workflow](https://help.github.com/en/actions) for testing & formatting your code when a branch is pushed to or a PR is updated. Formatted code will be pushed as a new commit to the branch.
- Add (or overwrite) a `.github/workflows/release.yml` [Github workflow](https://help.github.com/en/actions) for release a new version of your package with new commits to `master`.

Looking for CLI docs? View companion [`benmvp create` documentation](../cli/create.md).

## Examples

Create a new lib named `lib-of-fun` with the default settings (simplest setup):

```js
import { create } from '@benmvp/cli'

create({ name: 'lib-of-fun' })
```

Add lint verification to an existing library:

```js
import { create } from '@benmvp/cli'

create({
  modes: ['lint'],
})
```

Create a new library named `my-lib` that only outputs ESM format:

```js
import { create } from '@benmvp/cli'

create({
  name: 'my-lib',
  formats: ['esm'],
})
```

Add custom setup to an existing library:

```js
import { create } from '@benmvp/cli'

create({
  modes: ['type', 'spec'],
  out: './built',
  formats: ['esm', 'cjs'],
})
```

## Type

`create()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
(options?: Options): Promise<Result>
```

## Options

The optional `Options` object supports the following properties:

### `name`

The name of the library to create or update.

When `name` is unspecified:

- If a `package.json` does not already exist, it creates a new `package.json` with the name matching the directory it's within.
- If a `package.json` does exist, it does nothing to the existing `package.json`.

When `name` is specified:

- If a `package.json` does not already exist, it creates a new `package.json` with the specified name.
- If a `package.json` does exist, it updates the `"name"` property of the `package.json` with specified name.

### `formats`

An `Array` of the module formats to build. Available formats:

- `'type'` - Typescript definition files (`.d.ts`) so that clients of your library can use your library fully-typed
- `'esm'` - ECMAScript module format (everything transpiled to ES5 except for ES2015 `import`/`export` statements enabling [_tree shaking_](https://webpack.js.org/guides/tree-shaking/))
- `'cjs'` - CommonJS format (fully transpiled)

Optional. Defaults to all formats.

This will include the appropriate `"types"`, `"main"` (`cjs`), `"module"` (`esm`), and `"jsnext:main"` (`esm`) properties in the `package.json`. It will also update the `"build"` script to pass the matching argument.

### `out`

A path (relative or absolute) to the output directory for where the module formats should be built.

If you chose `'esm'` as one of the [`formats`](#formats) and choose `'./built'` as the output directory, the ESM files will live at `./built/esm`.

Optional. Defaults to `./lib`.

This will update the appropriate `"types"`, `"main"` (`cjs`), `"module"` (`esm`), `"jsnext:main"` (`esm`), `"types"` (Typescript), `"files"` (NPM release) properties in the `package.json`. It will also update the `"build"` script to pass the matching argument.

### `modes`

An `Array` of the types or modes of tests to run. Available modes:

- `'type'` - Runs Typescript type-checking
- `'lint'` - Runs ESLint
- `'spec'` - Runs Jest-based tests

Optional. Defaults to all modes when unspecified.

This will initialize the `"start"`, `"test"` and `"integrate"` scripts in the `package.json` to pass the matching argument.

## Return Value

`create()` returns a `Promise`.

When `create()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`.

If `create()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp create` documentation](../cli/create.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
