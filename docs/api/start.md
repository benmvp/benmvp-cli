# `start()` Documentation

Runs the specified modes of tests in on-going watch mode during active development, returning a `Promise` indicating whether the start succeeded or failed.

Looking for CLI docs? View companion [`benmvp start` documentation](../cli/start.md).

## Examples

To run all modes (default behavior):

```js
import {start} from '@benmvp/cli'

start()
```

To run just type-checking:

```js
import {start} from '@benmvp/cli'

start({
  modes: ['type']
})
```

To run linting & unit tests:

```sh
import {start} from '@benmvp/cli'

start({
  modes: ['lint', 'unit']
})
```

## Type

`start()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
([options]: Options): Promise<Result>
```

## Options

The optional `Options` object supports the following properties:

### `modes`

An `Array` of the types or modes of tests to run. Available modes:

- `'type'` - Runs Typescript type-checking
- `'lint'` - Runs ESLint
- `'unit'` - Runs Jest-based unit tests

Optional. Defaults to all modes when unspecified.

## Return Value

`start()` returns a `Promise`.

When `start()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`. Because `start()` runs the tests in watch-mode, the `Promise` will not resolve until the watch mode is manually stopped in the console.

If `start()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp start` documentation](../cli/start.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
