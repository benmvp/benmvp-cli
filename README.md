# benmvp CLI

A CLI for consistent infra for Ben Ilegbodu's Typescript-based libraries.

> NOTE: This CLI is still in initial development.

## ToC

*  [Installation](#installation)
*  [Quick Usage](#quick-usage)
*  [Docs](docs/)
*  [Supported Node Versions](#supported-node-versions)
*  [Technologies Used](#technologies-used)
*  [Contributing](CONTRIBUTING.md)
*  [Project philosophy](#project-philosophy)
*  [License](LICENSE)

## Installation

```sh
npx @benmvp/cli create my-awesome-lib
```

Installs the latest version of `@benmvp/cli` as a dev dependency and updates the `package.json` as follows:

```json
{
  "name": "my-awesome-lib",
  "scripts": {
    "start": "benmvp start",
    "test": "benmvp test",
    "build": "benmvp build"
  }
}
```

Read the API docs for more on [`benmvp create`](API.md#benmvp-create).

## Quick Usage

### Testing

```sh
yarn test
```

In your continuous integration (CI) environment, run `yarn test` (or `npm test`) to do a one-time pass of Typescript typings, ESLint linting, and Jest tests. This can also be run locally (i.e. for commit hooks).

Read the API docs for more on [`benmvp test`](API.md#benmvp-test).

### Developing

```sh
yarn start
```

When developing, run `yarn start` (or `npm start`) which will validate Typescript typings, ESLint linting, and Jest tests as you develop and change code.

Read the API docs for more on [`benmvp start`](API.md#benmvp-start).

### Building

```sh
yarn build
```

In your continuous integration (CI) environment, run `yarn build` (or `npm build`) to generated transpiled versions of your code in ESM (ECMAScript module), UMD (Unified module definition) & web formats.

Read the API docs for more on [`benmvp build`](API.md#benmvp-build).

## Docs

View the full [docs](docs/).

## Supported Node Versions

The CLI has been tested to work in Node 8+.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/) (type-checking)
- [Babel](https://babeljs.io/) (transpiling)
- [Jest](https://jestjs.io/en) (testing & code coverage)
- [ESLint](http://eslint.org/) (linting)
- [Yargs](https://github.com/yargs/yargs) (command line argument parsing)

## Contributing

Contributions are welcome! See [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Project philosophy

We take the stability of this SDK **very** seriously. `@benmvp/cli` follows the [SemVer](http://semver.org/) standard for versioning.

All updates must pass the [CI build](https://travis-ci.org/benmvp/benmvp-cli/).

## License

The library is available as open source under the terms of the [MIT License](LICENSE).
