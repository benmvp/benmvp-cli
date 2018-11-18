import yargs from 'yargs'
import * as cli from '../'

describe('run', () => {
  describe('unknown command', () => {
    it('throws an error', () => {
      expect(() => {
        cli.run(yargs.parse(['foo']))
      }).toThrowError()
    })
  })

  describe('create/default command', () => {})

  describe('build command', () => {})

  describe('test command', () => {})

  describe('start command', () => {})
})
