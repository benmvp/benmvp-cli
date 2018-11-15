# API documentation

## ToC

- [`benmvp create`](#benmvp-create)
  * [Manual installation](#manual-installation)
- [`benmvp test`](#benmvp-test)
- [`benmvp start`](#benmvp-start)
- [`benmvp build`](#benmvp-build)

---

## `benmvp create`

Creates a new library with infrastructure using `@benmvp/cli`. 

It will add `"test"`, `"start"`, and `"build"` scripts in the `package.json` to call [`benmvp test`](#benmvp-test), [`benmvp start`](#benmvp-start), and [`benmvp build`](#benmvp-build), respectively. After the `package.json` is created or updated, it will install `@benmvp/cli` as a dev dependency, using [Yarn](https://yarnpkg.com/) if available. If Yarn is unavailable, it will fallback to [NPM](https://docs.npmjs.com/).

### Examples

`@benmvp/cli` works best with [`npx`](https://github.com/zkat/npx) so that you don't have to globally install it and can always use the latest and greatest version.

Create a new lib named `lib-of-fun` with the default settings (simplest setup):

```sh
npx @benmvp/cli create lib-of-fun
```

Add lint verification to an existing library:

```sh
npx @benmvp/cli create --modes lint
```

Create a new library named `my-lib` that only outputs ESM format:

```sh
npx @benmvp/cli create my-lib --formats esm
```

Add custom setup to an existing library:

```sh
npx @benmvp/cli create --modes type unit --output-dir ./built --formats esm umd
```

### Arguments

#### `[name]`

(Optional) The name of the library to create or update.

When `name` is unspecified:
- If a `package.json` does not already exist, it creates a new `package.json` with the default name `"my-awesome-lib"`.
- If a `package.json` does exist, it does nothing to the existing `package.json`.

When `name` is specified:
- If a `package.json` does not already exist, it creates a new `package.json` with the specified name.
- If a `package.json` does exist, it updates the `"name"` property of the `package.json` with specified name.

#### `--formats`

A space-separated list of the module formats to build. Aliased as `-f`. Available formats:

- `type` - Typescript definition files (`.d.ts`) so that clients of your library can use your library fully-typed
- `esm` - ECMAScript module format (everything transpiled to ES5 except for ES2015 `import`/`export` statements enabling [_tree shaking_](https://webpack.js.org/guides/tree-shaking/))
- `umd` - Universal module definition format (Combination of CJS & AMD (asynchronous module definition) fully transpiled to ES5 includes minified version)
- `dist` - Bundled web distribution (`<script>` include fully transpiled to ES5 w/ a minified version)

Defaults to all formats.

This will include the appropriate `"types"`, `"main"` (`umd`), `"module"` (`esm`), `"jsnext:main"` (`esm`) and `"browser"` (`dist` minified) properties in the `package.json`. It will also update the `"build"` script to pass the matching argument.

#### `--output-dir`

A path (relative or absolute) to the output directory for where the module formats should be built. Aliased as `-o`.

Defaults to the current working directory (`.`).

This will update the appropriate `"types"`, `"main"` (`umd`), `"module"` (`esm`), `"jsnext:main"` (`esm`), `"browser"` (`dist` minified), and `"types"` (Typescript) properties in the `package.json`. It will also update the `"build"` script to pass the matching argument.

#### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `type` - Runs Typescript type-checking
- `lint` - Runs ESLint
- `unit` - Runs Jest-based unit tests

Defaults to all modes. 

This will initialize the `"start"` and `"test"` scripts in the `package.json` to pass the matching argument.

### Manual installation

`benmvp create` will automatically add the latest version of `@benmvp/cli` as a dev dependency to your library, even if a `package.json` exists. However, you can manually install it.

Install via [Yarn](https://yarnpkg.com/lang/en/docs/managing-dependencies/):

```sh
yarn add --dev @benmvp/cli
```

Install via [NPM](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install --save-dev @benmvp/cli
```

You will want to create scripts to call [`benmvp test`](#benmvp-test), [`benmvp start`](#benmvp-start), and [`benmvp build`](#benmvp-build) for ease of use.

---

## `benmvp test`

Runs a one-time pass of typing, linting & unit tests for the library.

### Examples

To run all modes (default behavior):

```sh
benmvp test
```

To run just unit tests:

```sh
benmvp test --modes lint
```

To run typing & linting:

```sh
benmvp start -m type lint
```

### Arguments

#### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `type` - Runs Typescript type-checking
- `lint` - Runs ESLint
- `unit` - Runs Jest-based unit tests

Defaults to all modes. 

---

## `benmvp start`

Runs the lib's tests in on-going watch mode during active development. When building a library, the best way to validate that it is working is by running tests. Having the tests running in watch mode make it easier to ensure that refactors are non-breaking.

### Examples

To run all modes (default behavior):

```sh
benmvp start
```

To run just type-checking:

```sh
benmvp start --modes type
```

To run linting & unit test:

```sh
benmvp start -m lint unit
```

### Arguments

#### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `type` - Runs Typescript type-checking
- `lint` - Runs ESLint
- `unit` - Runs Jest-based unit tests

Defaults to all modes.

---

## `benmvp build`

Builds the library into desired module formats at the specified location.

### Examples

To specify an alternate output directory:

```sh
benmvp build --output-path ./built
```

NOTE: You will need to manually update the default `"main"`, `"module"`, `"jsnext:main"`, `"browser"`, and `"types"` properties in your `package.json` to reflect the new location of the built module formats.

To exclude bundled web distribution format:

```sh
benmvp build --formats esm umd type
```

To put ESM & web distribution formats in an alternate build location with continuous watch:

```sh
benmvp build -f esm dist -o ./built -w
```

### Arguments

#### `--formats`

A space-separated list of the module formats to build. Aliased as `-f`. Available formats:

- `type` - Typescript definition files (`.d.ts`) so that clients of your library can use your library fully-typed
- `esm` - ECMAScript module format (everything transpiled to ES5 except for ES2015 `import`/`export` statements enabling [_tree shaking_](https://webpack.js.org/guides/tree-shaking/))
- `umd` - Universal module definition format (Combination of CommonJS & AMD fully transpiled to ES5 w/ a minified version)
- `dist` - Bundled web distribution (`<script>` include fully transpiled to ES5 w/ a minified version)

Defaults to all formats.

#### `--output-path`

A path (relative or absolute) to the output directory for the built module formats. Aliased as `-o`.

Defaults to the current working directory (`.`).

#### `--watch`

Continuously generates the built module formats whenever source files change. This is most useful if you've linked your library into a host application (with [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) or [`npm link`](https://docs.npmjs.com/cli/link)). Aliased as `-w`.

Defaults to `false`.

---

## More help

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues/new)!
