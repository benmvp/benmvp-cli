# `start()` Documentation

Runs the specified modes of tests in on-going watch mode during active development, returning a `Promise` indicating whether the start succeeded or failed.

Looking for CLI docs? View companion [`benmvp start` documentation](../cli/start.md).

## Examples

To continuously run all modes on all files (default behavior):

```js
import {start} from '@benmvp/cli'

start()
```

To continuously run just type-checking on all files:

```js
import {start} from '@benmvp/cli'

start({
  modes: ['type']
})
```

To continuously run linting & unit tests on all files:

```sh
import {start} from '@benmvp/cli'

start({
  modes: ['lint', 'spec']
})
```

To continuously run all modes only on files within `utils/` directories:

```js
import {test} from '@benmvp/cli'

start({
  pattern: 'utils/',
})
```

To continuously run just linting on files within `api/` directories:

```js
import {test} from '@benmvp/cli'

start({
  modes: ['lint'],
  pattern: 'api/',
})
```

## Signature

`start()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
type Mode = 'type' | 'lint' | 'spec'
namespace TestOptions {
  modes: Mode[];
  pattern: string;
}

(options?: TestOptions): Promise<Result>
```

## Options

The optional `Options` object supports the following properties:

### `modes`

An `Array` of the types or modes of tests to run. Available modes:

- `'type'` - Runs Typescript type-checking (files ending in `.ts`)
- `'lint'` - Runs ESLint (files ending in `.ts`)
- `'spec'` - Runs Jest-based unit tests (files ending in `.spec.ts`)

Optional. Defaults to all modes when unspecified.

> NOTE: [Jest Watch Plugins](https://jestjs.io/docs/en/watch-plugins) are added to make watch mode even more useful. Specifically the [eslint `watch-fix` plugin](https://github.com/jest-community/jest-runner-eslint#toggle---fix-in-watch-mode) is added to enable auto-fixing of lint errors. However, for this to work, `'lint'` has to be the first mode when specified.

### `pattern`

A regexp pattern string that is matched against all tests paths before executing the test.

Optional. Defaults to `''` (signifying no filter)

## Return Value

`start()` returns a `Promise`.

When `start()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`. Because `start()` runs the tests in watch-mode, the `Promise` will not resolve until the watch mode is manually stopped in the console.

If `start()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp start` documentation](../cli/start.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
