export default class Animal {
  private name: string

  public constructor (animalName: string) {
    this.name = animalName
  }

  public move (meters: number): void {
    // eslint-disable-next-line no-console
    console.log(`${this.name}  moved ${meters}m.`)
  }
}
