// ensure every test case has an assertion
// (particularly useful for async tests)
beforeEach(() => {
  expect.hasAssertions()
})

const CONSOLE_FAIL_TYPES = ['error', 'warn']

// Throw errors when a `console.error` or `console.warn` happens
CONSOLE_FAIL_TYPES.forEach((type) => {
  // eslint-disable-next-line no-console
  console[type] = (message) => {
    throw new Error(`Failing due to console.${type} while running test!\n\n${message}`)
  }
})
