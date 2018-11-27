import {TestMode} from './types'

const VALIDATE_TEST_MODES = {type: 1, lint: 1, unit: 1}

/**
 * Validates whether all the specified modes are valid
 * @param modes List of test modes/types to validate
 * @returns True if all of the modes are valid
 * @throws An error if any of the modes are invalid
 */
export const modesAreValid = (modes: Array<TestMode>) => {
  const invalidModes = modes.filter(mode => !(mode in VALIDATE_TEST_MODES))

  if (invalidModes.length) {
    throw new Error(`Invalid test modes specified: ${invalidModes}`)
  }

  return true
}
