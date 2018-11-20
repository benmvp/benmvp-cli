import noop from 'lodash/noop'

/**
 * Stubs the method on the object with an optional implementation
 */
export const stub = (object: object, methodName: never, implementation = noop): jest.Mock<never> =>
  jest.spyOn(object, methodName).mockImplementation(implementation)
