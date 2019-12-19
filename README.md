# `@benmvp/cli`

[![version](https://img.shields.io/npm/v/@benmvp/cli.svg)](http://npm.im/@benmvp/cli)
[![downloads](https://img.shields.io/npm/dt/@benmvp/cli.svg)](https://www.npmjs.com/package/@benmvp/cli)
![module formats: esm & cjs](https://img.shields.io/badge/module%20formats-esm%2C%20cjs-green.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/benmvp/benmvp-cli.svg)](LICENSE)

[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/benmvp-cli/pulse)
[![Build Status](https://github.com/benmvp/benmvp-cli/workflows/CI/badge.svg)](https://github.com/benmvp/benmvp-cli/actions)
[![Tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Dependencies status](https://img.shields.io/david/benmvp/benmvp-cli.svg)](https://david-dm.org/benmvp/benmvp-cli)
[![Dev Dependencies status](https://img.shields.io/david/dev/benmvp/benmvp-cli.svg)](https://david-dm.org/benmvp/benmvp-cli?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/benmvp/benmvp-cli.svg)](https://greenkeeper.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/benmvp/benmvp-cli.svg?style=social)](https://github.com/benmvp/benmvp-cli/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/benmvp/benmvp-cli.svg?style=social)](https://github.com/benmvp/benmvp-cli/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/benmvp/benmvp-cli.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20benmvp-cli%20by%20%40benmvp!%0A%0Ahttps%3A%2F%2Fgithub.com%2Fbenmvp%2Fbenmvp-cli)

A highly-opinionated, zero-config CLI for consistent infra for Ben Ilegbodu's Typescript-based libraries.

## ToC

- [Installation](#installation)
- [Quick Usage](#quick-usage)
- [Docs](docs/)
- [Supported Node Versions](#supported-node-versions)
- [Technologies Used](#technologies-used)
- [Contributing](CONTRIBUTING.md)
- [Project philosophy](#project-philosophy)
- [License](LICENSE)

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

Read the API docs for more on [`benmvp create`](docs/cli/create.md).

## Quick Usage

### Unit Testing

```sh
npm test
```

In your continuous integration (CI) environment, run `npm test` (or `yarn test`) to do a one-time pass of Typescript typings, ESLint linting, and Jest unit tests. This can also be run locally (i.e. for commit hooks).

Read the API docs for more on [`benmvp test`](docs/cli/test.md).

### Developing

```sh
npm start
```

When developing, run `npm start` (or `yarn start`) which will validate Typescript typings, ESLint linting, and Jest unit tests as you develop and change code.

Read the API docs for more on [`benmvp start`](docs/cli/start.md).

### Building

```sh
npm run build
```

In your continuous integration (CI) environment, run `npm run build` (or `yarn build`) to generate transpiled versions of your code in ESM (ECMAScript module) and CJS (CommonJS), as well as TypeScript definition files.

Read the API docs for more on [`benmvp build`](docs/cli/build.md).

### Integration Testing

```sh
npm run integrate
```

In your continuous integration (CI) environment, run `npm run integrate` (or `yarn integrate`) to run additional integration tests for the library. The integration "project" will also be typed and linted. This can also be run locally (i.e. for commit hooks but is not recommended).

Read the API docs for more on [`benmvp integrate`](docs/cli/integrate.md).

## Docs

`@benmvp/cli` has two interfaces: a CLI and a Node API. View the [full docs](docs/).

## Supported Node Versions

The CLI has been tested to work in Node 8+.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/) (type-checking)
- [Babel](https://babeljs.io/) (transpiling)
- [Jest](https://jestjs.io/en) (testing & code coverage)
- [React testing library](https://testing-library.com/docs/react-testing-library/intro) (testing React components)
- [ESLint](http://eslint.org/) (linting)
- [Prettier](https://prettier.io/) (code formatting)
- [Yargs](https://github.com/yargs/yargs) (command line argument parsing)

## Contributing

Contributions are welcome! See [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Project philosophy

We take the stability of this SDK **very** seriously. `@benmvp/cli` follows the [SemVer](http://semver.org/) standard for versioning.

All updates must pass the [CI build](https://github.com/benmvp/benmvp-cli/actions).

## License

The library is available as open source under the terms of the [MIT License](LICENSE).
