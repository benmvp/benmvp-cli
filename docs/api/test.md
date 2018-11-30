# `test()` Documentation

Runs a one-time pass of the specified modes of tests, returning a `Promise` indicating whether the test run succeeded or failed.

> NOTE: `test()` assumes your source files live within the `src/` folder of the current working directory where the script is being called.

Looking for CLI docs? View companion [`benmvp test` documentation](../cli/test.md).

## Examples

To run all modes (default behavior):

```js
import {test} from '@benmvp/cli'

test()
```

To run just unit tests:

```js
import {test} from '@benmvp/cli'

test({
  modes: ['unit'],
})
```

To run typing & linting:

```js
import {test} from '@benmvp/cli'

test({
  modes: ['type', 'lint'],
})
```

## Type

`test()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
([options]: Options): Promise<Result>
```

## Options

The optional `Options` object supports the following properties:

### `modes`

An `Array` of the types or modes of tests to run. Available modes:

- `'type'` - Runs Typescript type-checking (files ending in `.ts`)
- `'lint'` - Runs ESLint (files ending in `.ts`)
- `'unit'` - Runs Jest-based unit tests (files ending in `.spec.ts`)

Optional. Defaults to all modes when unspecified. 

## Return Value

`test()` returns a `Promise`.

When `test()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`.

If `test()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp test` documentation](../cli/test.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
