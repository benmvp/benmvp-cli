# `benmvp integrate` Documentation

Runs additional integration tests for the library. The integration tests are also typed and linted.

> NOTE: `benmvp integrate` assumes the integration tests live within the `integration-tests/src` folder of the current working directory where the script is being called.

The integration tests generally are run in your continuous integration (CI) environment to verify that your library when packaged can successfully be used by clients. The goal is dummy library/project in which you write tests that import and use the library like a normal client would.

The integration test process is as follows:

1. [`npm pack`](https://docs.npmjs.com/cli/pack.html) the library to create the _same_ `.tgz` tarball that would be published in the registry
1. Copy the integration tests "project" at `integration-tests/` over to a temporary directory
1. `npm install` the packed library (from Step 1), `@benmvp/cli`, and any other dependencies specified in the `package.json` of the project
1. Run `npx benmvp test` on the project to use `@benmvp/cli` to run the tests

Looking for Node API docs? View companion [`integrate()` documentation](../api/integrate.md).

## Examples

To run all modes of integration tests on all files (default behavior):

```sh
benmvp integrate
```

To run just the integration tests themselves (excluding linting & typing) on all files:

```sh
benmvp integrate --modes spec
```

To run just linting & typing on all files in the integration tests project:

```sh
benmvp integrate --modes lint type
```

To run all modes only on files within `utils/` directories of the integration tests project:

```sh
benmvp integration --pattern utils/
```

To just run linting on files within `api/` directories of the integration tests project:

```sh
benmvp integrate --modes lint --pattern api/
```

## Arguments

### `--modes`

A space-separated list of the types or modes of tests to run. Aliased as `-m`. Available modes:

- `spec` - Runs Jest-based tests (files ending in `.spec.ts` or in `__tests__` folder)
- `lint` - Runs ESLint (files ending in `.ts`)
- `type` - Runs Typescript type-checking (files ending in `.ts`)

Optional. Defaults to all modes.

### `--pattern`

A regexp pattern string that is matched against all tests paths before executing the test. Aliased as `-p`.

Optional. Defaults to `''` (signifying no filter)

---

## More help

Looking for Node API docs? View companion [`integrate()` documentation](../api/integrate.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
