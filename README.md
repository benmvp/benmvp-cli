# `@benmvp/cli`

![module formats: esm & cjs](https://img.shields.io/badge/module%20formats-esm%2C%20cjs-green.svg)
[![license](https://img.shields.io/github/license/benmvp/benmvp-cli.svg)](LICENSE)

[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/benmvp-cli/pulse)
[![Build Status](https://travis-ci.org/benmvp/benmvp-cli.svg?branch=master)](https://travis-ci.org/benmvp/benmvp-cli)
[![Dependencies status](https://img.shields.io/david/benmvp/benmvp-cli.svg)](https://david-dm.org/benmvp/benmvp-cli)
[![Dev Dependencies status](https://img.shields.io/david/dev/benmvp/benmvp-cli.svg)](https://david-dm.org/benmvp/benmvp-cli?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/benmvp/benmvp-cli.svg)](https://greenkeeper.io/)

[![Watch on GitHub](https://img.shields.io/github/watchers/benmvp/benmvp-cli.svg?style=social)](https://github.com/benmvp/benmvp-cli/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/benmvp/benmvp-cli.svg?style=social)](https://github.com/benmvp/benmvp-cli/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/benmvp/benmvp-cli.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20benmvp-cli%20by%20%40benmvp!%0A%0Ahttps%3A%2F%2Fgithub.com%2Fbenmvp%2Fbenmvp-cli)

A highly-opinionated, zero-config CLI for consistent infra for Ben Ilegbodu's Typescript-based libraries.

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

In your continuous integration (CI) environment, run `yarn build` (or `npm build`) to generated transpiled versions of your code in ESM (ECMAScript module) and CJS (CommonJS).

Read the API docs for more on [`benmvp build`](API.md#benmvp-build).

## Docs

`@benmvp/cli` has two interfaces: a CLI and a Node API. View the full [docs](docs/).

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
