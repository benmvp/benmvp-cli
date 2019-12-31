import { spawn } from 'child_process'

/**
 * A Promise wrapper around `spawn`
 * @param {string} command The full path to the command to run
 * @param {string[]} args Any arguments to pass to the pass command
 * @returns {Promise} Returns a resolved promise when the command finishes running or a rejected promise with the error if it fails
 */
export const spawnAsync = (command: string, args: string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, { stdio: 'inherit' })

    childProcess.on('close', (code) => {
      if (code !== 0) {
        reject(
          new Error(`"${command} ${args.join(' ')}" exited with code ${code}`),
        )
      } else {
        resolve()
      }
    })
  })
