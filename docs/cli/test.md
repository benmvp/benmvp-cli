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
benmvp start --modes type lint
```

## Arguments

### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `'type'` - Runs Typescript type-checking (files ending in `.ts`)
- `'lint'` - Runs ESLint (files ending in `.ts`)
- `'unit'` - Runs Jest-based unit tests (files ending in `.spec.ts`)

Optional. Defaults to all modes.

### `--watch`

A flag indicating whether or not to continuously run the tests whenever source files change. Aliased as `-w`.

Optional. Defaults to `false`.

---

## More help

Looking for Node API docs? View companion [`test()` documentation](../api/test.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
