import Animal from './animal'

export default class Snake extends Animal {
  public move (): void {
    // eslint-disable-next-line no-console
    console.log('Slithering...')
    super.move(5)
  }
}
