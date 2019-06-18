import {resolve} from 'path'
import {dirSync} from 'tmp'
import {copy, pathExists} from 'fs-extra'
import {INTEGRATE_ARGS} from '../../cli/args'
import {Result} from '../types'
import {execAndLog, getTestArgs} from './utils'

const INTEGRATION_PATH = resolve(process.cwd(), 'integration-tests')

/**
 * Runs a one-time pass of the specified integration tests
 * @param {Object} [options] The configuration options for testing the library
 * @param {TestMode[]} [options.modes] List of the types or modes of tests to run
 * @param {string} [options.pattern]  Regexp pattern string that is matched against all tests paths before executing the test
 * @returns {Promise<Result>} The result of executing the test
 */
export default async ({
  modes = INTEGRATE_ARGS.modes.default,
  pattern = INTEGRATE_ARGS.pattern.default,
}): Promise<Result> => {
  let tempIntegration

  try {
    // Create temp directory where we'll copy integration tests
    // in order to run them
    tempIntegration = dirSync({unsafeCleanup: true})

    // eslint-disable-next-line no-console
    console.log(`Created temp integration path: ${tempIntegration.name}`)

    // yarn pack and move to $tempIntegration
    const tempGzipFilePath = resolve(tempIntegration.name, 'lib.tgz')

    await execAndLog(`yarn pack --filename ${tempGzipFilePath}`)

    if (!pathExists(tempGzipFilePath)) {
      throw new Error(`Unable to create archive ${tempGzipFilePath}`)
    }

    // cp -r ./integration-tests $tempIntegration
    await copy(INTEGRATION_PATH, tempIntegration.name)

    // eslint-disable-next-line no-console
    console.log(`Copied ${INTEGRATION_PATH} to temp integration path`)

    // Add .tgz file as dependency
    // This will also install all missing dependencies from `package.json`
    await execAndLog(`yarn add --dev ${tempGzipFilePath}`, tempIntegration.name)

    if (!pathExists(await resolve(tempIntegration.name, 'node_modules'))) {
      throw new Error(`Node modules not successfully installed at ${tempIntegration.name}`)
    }

    const testArgs = getTestArgs({modes, pattern})

    // Run `npx benmvp test` in $tempIntegration to use @benmvp/cli
    // to run the integration tests
    // NOTE: For integration test *for* @benmvp/cli this will use the .tgz version
    // that would've been added above
    // TODO: Figure out how to use the same version of @benmvp/cli already installed
    await execAndLog(`npx benmvp test ${testArgs}`, tempIntegration.name)
  } catch (error) {
    return {
      code: 1,
      message: 'Error running "integrate" command',
      error,
    }
  } finally {
    if (tempIntegration) {
      // clean up temp directory
      await execAndLog(`npx rimraf ${tempIntegration.name}`)

      tempIntegration.removeCallback()

      // eslint-disable-next-line no-console
      console.log(`Removed: ${tempIntegration.name}`)
    }
  }

  return {
    code: 0,
  }
}

// /var/folders/dq/x9y69hm90wl4f_y0w97jgth40000gp/T/tmp-20897XSqDmu6wz3Yk
// /var/folders/dq/x9y69hm90wl4f_y0w97jgth40000gp/T/tmp-20897U0meVhh11znC
