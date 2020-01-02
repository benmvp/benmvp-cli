# `benmvp create` Documentation

Creates a new library or updates an existing library, to be set up with infrastructure using the latest version of `@benmvp/cli`.

It will:

- Set up git (i.e. `git init`) in the directory
- Add `"test"`, `"start"`, `"build"` and `"integrate"` scripts in the `package.json` to call [`benmvp test`](test.md), [`benmvp start`](start.md), [`benmvp build`](build.md), and [`benmvp integrate`](integrate.md), respectively
- After the `package.json` is created (or updated), it will install `@benmvp/cli` as a dev dependency, using [npm](https://docs.npmjs.com/)
- Add a dummy `src/index.ts` file which is the entry-point to the lib and from where all top-level API functions will be exported
- Add (or overwrite) [`.prettierrc.json`](https://github.com/benmvp/benmvp-cli/blob/master/.prettierrc.json), [`.prettierignore`](https://github.com/benmvp/benmvp-cli/blob/master/.prettierignore) & [`.vscode/settings.json`](https://github.com/benmvp/benmvp-cli/blob/master/.vscode/settings.json) files to format all code
- Add (or overwrite) [Github workflows](https://help.github.com/en/actions):
  - [`.github/workflows/ci.yml`](https://github.com/benmvp/benmvp-cli/blob/master/.github/workflows/ci.yml) for testing your code when a branch is pushed to or a PR is updated.
  - [`.github/workflows/format.yml`](https://github.com/benmvp/benmvp-cli/blob/master/.github/workflows/format.yml) for formatting your files when a non-`master` branch is pushed to. Formatted code will be pushed as a new commit to the branch.
  - [`.github/workflows/validate-pr.yml`](https://github.com/benmvp/benmvp-cli/blob/master/.github/workflows/validate-pr.yml) for validating that each PR title follows the [Conventional Commits specification](https://www.conventionalcommits.org/).
  - [`.github/workflows/release.yml`](https://github.com/benmvp/benmvp-cli/blob/master/.github/workflows/release.yml) for releasing a new version of your package upon new commits to `master`.
- Add (or overwrite) [`.github/pull_request_template.md`](https://github.com/benmvp/benmvp-cli/blob/master/.github/pull_request_template.md) & [`.github/ISSUE_TEMPLATE`](https://github.com/benmvp/benmvp-cli/tree/master/.github/ISSUE_TEMPLATE) for more organized [pull request](https://help.github.com/en/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository) and [issue](https://help.github.com/en/github/building-a-strong-community/configuring-issue-templates-for-your-repository) creation.
- Add (or overwrite) other miscellaneous config files:
  - [`.gitignore`](https://github.com/benmvp/benmvp-cli/blob/master/.gitignore)
  - [`.nvmrc`](https://github.com/benmvp/benmvp-cli/blob/master/.nvmrc)
  - [`CHANGELOG.md`](https://github.com/benmvp/benmvp-cli/blob/master/CHANGELOG.md)
  - [`CONTRIBUTING.md`](https://github.com/benmvp/benmvp-cli/blob/master/CONTRIBUTING.md)
  - [`CODE_OF_CONDUCT.md`](https://github.com/benmvp/benmvp-cli/blob/master/CODE_OF_CONDUCT.md)
  - [`LICENSE`](https://github.com/benmvp/benmvp-cli/blob/master/LICENSE)

> NOTE: `benmvp create` can be called multiple times on a repo. It's a good idea to call `benmvp create` every time you bump the version of `@benmvp/cli` so you can get the latest configuration for `package.json`, prettier, Github workflows, Github PR/Issue templates, and other miscellaneous config files.

Looking for Node API docs? View companion [`create()` documentation](../api/create.md).

## Examples

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
npx @benmvp/cli create --modes type spec --out ./built --formats esm cjs
```

## Arguments

### `[name]`

(Optional) The name of the library to create or update.

When `name` is unspecified, it assumes the current working directory is the root of the library. Also:

- If a `package.json` does not already exist, it creates a new `package.json` with the name matching the directory it's within.
- If a `package.json` does exist, it does nothing to the existing `package.json`.

When `name` is specified, it will create a directory of `name` within the current working directory. Also:

- If a `package.json` does not already exist, it creates a new `package.json` with the specified name.
- If a `package.json` does exist, it updates the `"name"` property of the `package.json` with specified name.

### `--formats`

A space-separated list of the module formats to build. Aliased as `-f`. Available formats:

- `type` - Typescript definition files (`.d.ts`) so that clients of your library can use your library fully-typed
- `esm` - ECMAScript module format (everything transpiled to ES5 except for ES2015 `import`/`export` statements enabling [_tree shaking_](https://webpack.js.org/guides/tree-shaking/))
- `cjs` - CommonJS format (fully transpiled)

Optional. Defaults to all formats.

This will include the appropriate `"types"`, `"main"` (`cjs`), `"module"` (`esm`), and `"jsnext:main"` (`esm`) properties in the `package.json`. It will also update the `"build"` script to pass the matching argument.

### `--out`

A path (relative or absolute) to the output directory for where the module formats should be built. Aliased as `-o`.

If you chose `'esm'` as one of the [`formats`](#formats) and choose `'./built'` as the output directory, the ESM files will live at `./built/esm`.

Optional. Defaults to `./lib`.

This will update the appropriate `"types"`, `"main"` (`cjs`), `"module"` (`esm`), `"jsnext:main"` (`esm`), `"types"` (Typescript), `"files"` (NPM release) properties in the `package.json`. It will also update the `"build"` script to pass the matching argument.

### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `type` - Runs Typescript type-checking
- `lint` - Runs ESLint
- `spec` - Runs Jest-based tests

Optional. Defaults to all modes.

This will initialize the `"start"`, `"test"` and `"integrate"` scripts in the `package.json` to pass the matching argument.

## Manual installation

`benmvp create` will automatically add the latest version of `@benmvp/cli` as a dev dependency to your library, even if a `package.json` exists. However, you can manually install it.

Install via [npm](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install --save-dev @benmvp/cli
```

Install via [Yarn](https://yarnpkg.com/lang/en/docs/managing-dependencies/):

```sh
yarn add --dev @benmvp/cli
```

You will want to create scripts to call [`benmvp test`](test.md), [`benmvp start`](start.md), and [`benmvp build`](build.md) for ease of use.

---

## More help

Looking for Node API docs? View companion [`create()` documentation](../api/create.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
