import {resolve} from 'path'
import {TestMode} from '../types'

interface ValidTestModes {
  type: string
  lint: string
  unit: string
  [index: string]: string
}
const VALID_TEST_MODES = {
  type: resolve(__dirname, 'project-type.js'),
  // lint: resolve(__dirname, 'project-lint.js'),
  unit: resolve(__dirname, 'project-unit.js'),
} as ValidTestModes

/**
 * Validates whether all the specified modes are valid
 * @param modes List of test modes/types to validate
 * @returns True if all of the modes are valid
 * @throws An error if any of the modes are invalid
 */
export const modesAreValid = (modes: Array<TestMode>) => {
  const invalidModes = modes.filter(mode => !(mode in VALID_TEST_MODES))

  if (invalidModes.length) {
    throw new Error(`Invalid test modes specified: ${invalidModes}`)
  }

  return true
}

/**
 * Retrieves the arguments to pass to Jest based on the specified options
 * @param {Object} options The configuration options for testing the library
 * @param {Array<TestMode>} options.modes List of the types or modes of tests to run
 * @returns {Array<string>} The array of arguments
 */
export const getJestArgs = ({modes}: {modes: Array<TestMode>}) => {
  const validModes = modes.filter(mode => mode in VALID_TEST_MODES)

  if (!validModes.length || validModes.length < modes.length) {
    throw new Error(`Invalid test modes specified: ${modes}`)
  }

  const projects = validModes.map(mode => VALID_TEST_MODES[mode])

  return ['--projects', ...projects]
}
