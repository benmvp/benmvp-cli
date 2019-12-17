# `test()` Documentation

Runs a one-time pass of the specified modes of tests, returning a `Promise` indicating whether the test run succeeded or failed.

> NOTE: `test()` assumes your source files live within the `src/` folder of the current working directory where the script is being called.

Looking for CLI docs? View companion [`benmvp test` documentation](../cli/test.md).

## Examples

To run all modes on all files (default behavior):

```js
import { test } from '@benmvp/cli'

test()
```

To run just unit tests on all files:

```js
import { test } from '@benmvp/cli'

test({
  modes: ['spec'],
})
```

To run linting & typing on all files:

```js
import { test } from '@benmvp/cli'

test({
  modes: ['lint', 'type'],
})
```

To run all modes only on files within `utils/` directories:

```js
import { test } from '@benmvp/cli'

test({
  pattern: 'utils/',
})
```

To just run linting on files within `api/` directories while continuously watching for changes:

```js
import { test } from '@benmvp/cli'

test({
  modes: ['lint'],
  pattern: 'api/',
  watch: true,
})
```

## Signature

`test()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
type Mode = 'type' | 'lint' | 'spec'
namespace TestOptions {
  modes: Mode[];
  pattern: string;
  watch: boolean;
}

(options?: TestOptions): Promise<Result>
```

## Options

The optional `TestOptions` object supports the following properties:

### `modes`

An `Array` of the types or modes of tests to run. Available modes:

- `'type'` - Runs Typescript type-checking (files ending in `.ts` or `.tsx`)
- `'lint'` - Runs ESLint (files ending in `.ts` or `.tsx`)
- `'spec'` - Runs Jest-based unit tests (files ending in `.spec.ts`)

Optional. Defaults to all modes when unspecified.

### `pattern`

A regexp pattern string that is matched against all tests paths before executing the test.

Optional. Defaults to `''` (signifying no filter)

### `watch`

A flag indicating whether or not to continuously run the tests whenever source files change.

Optional. Defaults to `false`.

> NOTE: [Jest Watch Plugins](https://jestjs.io/docs/en/watch-plugins) are added to make watch mode even more useful. Specifically the [eslint `watch-fix` plugin](https://github.com/jest-community/jest-runner-eslint#toggle---fix-in-watch-mode) is added to enable auto-fixing of lint errors. However, for this to work, `'lint'` has to be the first mode when specified.

## Return Value

`test()` returns a `Promise`.

When `test()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`.

If `test()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp test` documentation](../cli/test.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
