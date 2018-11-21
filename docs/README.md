# `@benmvp/cli` Documentation

`@benmvp/cli` can be used in two ways. The primary way is as a [CLI](cli/) typically used within a [`package.json`](https://docs.npmjs.com/files/package.json) or with [`npx`](https://github.com/zkat/npx). Alternatively, you can interact with it via its [Node API](api/) if it is to be used within a bigger CLI.

## CLI docs

The CLI exposes the following commands:

- [`benmvp create`](cli/create.md) - Creates a new library set up with infrastructure using `@benmvp/cli`
- [`benmvp test`](cli/test.md) - Runs a one-time pass of typing, linting, unit tests & code coverage for the library
- [`benmvp start`](cli/start.md) - Runs the lib's tests in on-going watch mode during active development
- [`benmvp build`](cli/build.md) - Builds the library into the desired module formats at the specified location

## Node API docs

The Node API exposes the following functions:

- [`create()`](docs/create.md) - Creates a new library with the specified name set up with infrastructure using `@benmvp/cli`
- [`test()`](docs/test.md) - Runs a one-time pass of the specified modes of tests
- [`start()`](docs/start.md) - Runs the specified modes of tests in on-going watch mode during active development
- [`build()`](docs/build.md) - Builds the library into the desired module formats at the specified location
- [`run()`](docs/run.md) - Parses the specified array of CLI arguments to runs the desired command
