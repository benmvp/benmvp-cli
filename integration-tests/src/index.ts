import {resolve} from 'path'
import {readFileSync} from 'fs-extra'

const PACKAGE_JSON = readFileSync(resolve(__dirname, '../package.json'))

const log = (message: string): void => {
  // eslint-disable-next-line no-console
  console.log(message)
}

class Animal {
  private name: string

  public constructor (animalName: string) {
    this.name = animalName
  }

  public move (meters: number): void {
    log(`${this.name}  moved ${meters}m.`)
  }
}

class Snake extends Animal {
  public move (): void {
    log('Slithering...')
    super.move(5)
  }
}

class Horse extends Animal {
  public move (): void {
    log('Galloping...')
    super.move(45)
  }
}

export const run = (): void => {
  const sam = new Snake('Sammy the Python')
  const tom: Animal = new Horse('Tommy the Palomino')

  sam.move()
  tom.move(34)

  log(PACKAGE_JSON.toString())
}
