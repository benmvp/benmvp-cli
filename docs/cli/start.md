# `benmvp start` Documentation

Runs the library's tests in on-going watch mode during active development. 

When building a library, the best way to validate that it is working is by type-checking and running tests. Having the type-checking and tests running in watch mode make it easier to continuously ensure that new code is correct and refactors are non-breaking.

Looking for Node API docs? View companion [`start()` documentation](../api/start.md).

## Examples

To run all modes (default behavior):

```sh
benmvp start
```

To run just type-checking:

```sh
benmvp start --modes type
```

To run linting & unit tests:

```sh
benmvp start --modes lint unit
```

## Arguments

### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `lint` - Runs ESLint (files ending in `.ts`)
- `type` - Runs Typescript type-checking (files ending in `.ts`)
- `unit` - Runs Jest-based unit tests (files ending in `.spec.ts`)

Optional. Defaults to all modes.

> NOTE: [Jest Watch Plugins](https://jestjs.io/docs/en/watch-plugins) are added to make watch mode even more useful. Specifically the [eslint `watch-fix` plugin](https://github.com/jest-community/jest-runner-eslint#toggle---fix-in-watch-mode) is added to enable auto-fixing of lint errors. However, for this to work, `lint` has to be the first mode when specified.

---

## More help

Looking for Node API docs? View companion [`start()` documentation](../api/start.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
