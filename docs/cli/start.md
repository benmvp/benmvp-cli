# `benmvp start` Documentation

Runs the library's tests in on-going watch mode during active development. 

When building a library, the best way to validate that it is working is by running tests. Having the tests running in watch mode make it easier to continuously ensure that refactors are non-breaking.

## Examples

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
benmvp start --modes lint unit
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
