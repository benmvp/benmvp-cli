# `benmvp test` Documentation

Runs a one-time pass of typing, linting, unit tests & code coverage for the library.

## Examples

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
benmvp start --modes type lint
```

## Arguments

### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `type` - Runs Typescript type-checking
- `lint` - Runs ESLint
- `unit` - Runs Jest-based unit tests

Defaults to all modes. 

---

## More help

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues/new)!
