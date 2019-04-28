# `benmvp test` Documentation

Runs a one-time pass of typing, linting, unit tests & code coverage for the library.

> NOTE: `benmvp test` assumes your source files live within the `src/` folder of the current working directory where the script is being called.

Looking for Node API docs? View companion [`test()` documentation](../api/test.md).

## Examples

To run all modes (default behavior):

```sh
benmvp test
```

To run just unit tests:

```sh
benmvp test --modes unit
```

To run typing & linting:

```sh
benmvp start --modes lint type
```

## Arguments

### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `lint` - Runs ESLint (files ending in `.ts`)
- `type` - Runs Typescript type-checking (files ending in `.ts`)
- `unit` - Runs Jest-based unit tests (files ending in `.spec.ts`)

Optional. Defaults to all modes.

### `--watch`

A flag indicating whether or not to continuously run the tests whenever source files change. Aliased as `-w`.

Optional. Defaults to `false`.

> NOTE: [Jest Watch Plugins](https://jestjs.io/docs/en/watch-plugins) are added to make watch mode even more useful. Specifically the [eslint `watch-fix` plugin](https://github.com/jest-community/jest-runner-eslint#toggle---fix-in-watch-mode) is added to enable auto-fixing of lint errors. However, for this to work, `lint` has to be the first mode whe specified.

---

## More help

Looking for Node API docs? View companion [`test()` documentation](../api/test.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
