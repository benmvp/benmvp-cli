import {resolve} from 'path'
import {readJSON} from 'fs-extra'

const PACKAGE_JSON = readJSON(resolve(__dirname, '../package.json'))

const log = (message: string) => {
  // eslint-disable-next-line no-console
  console.log(message);
}

class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }
  move(meters: number) {
    log(this.name + ' moved ' + meters + 'm.')
  }
}

class Snake extends Animal {
  move() {
    log('Slithering...')
    super.move(5);
  }
}

class Horse extends Animal {
  move() {
    log('Galloping...')
    super.move(45);
  }
}

export const run = () => {
  const sam = new Snake('Sammy the Python')
  const tom: Animal = new Horse('Tommy the Palomino')

  sam.move()
  tom.move(34)

  log(PACKAGE_JSON)
}
