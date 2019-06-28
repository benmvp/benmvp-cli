import Animal from './animal'

export default class Horse extends Animal {
  public move (): void {
    // eslint-disable-next-line no-console
    console.log('Galloping...')
    super.move(45)
  }
}
