# `run()` Documentation

Parses the specified array of CLI arguments to run the desired command, returning a `Promise` indicating whether the build succeeded or failed.

This function is most useful if you have a Node script that accepts parameters that you would like to pass on to `@benmvp/cli`.

> NOTE: The array of CLI arguments must **not** include the first two arguments passed in `process.argv`: the node shell and script paths.

## Examples

Pass along the arguments from a Node script:

```js
const {run} = require('@benmvp/cli');

run(process.argv.slice(2))
```

Build with specified formats:

```js
const {run} = require('@benmvp/cli');

run(['build', '--formats', 'esm', 'cjs'])
```

To run just unit tests:

```js
const {run} = require('@benmvp/cli');

run(['test', '--modes', 'spec'])
```

## Type

`run()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
(args?: string[]): Promise<Result>
```

## Arguments

An array of CLI arguments similar to the arguments received by `process.argv` (after the first 2 elements).

## Return Value

`run()` returns a `Promise`.

When `run()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`. If `run()` has argumnts that cause it to run in "watch mode" ([start](start.md) or [build watch](build.md#watch), the `Promise` will not resolve until the watcher is stopped.

If `run()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

See also [CLI docs](../cli).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
