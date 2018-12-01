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
 * Retrieves the arguments to pass to Jest based on the specified options
 * @param {Object} options The configuration options for testing the library
 * @param {Array<TestMode>} options.modes List of the types or modes of tests to run
 * @returns {Array<string>} The array of arguments
 */
export const getJestArgs = ({modes}: {modes: Array<TestMode>}): Array<string> => {
  const validModes = modes.filter(mode => mode in VALID_TEST_MODES)

  if (!validModes.length || validModes.length < modes.length) {
    throw new Error(`Invalid test modes specified: ${modes}`)
  }

  const projects = validModes.map(mode => VALID_TEST_MODES[mode])

  return ['--projects', ...projects]
}
