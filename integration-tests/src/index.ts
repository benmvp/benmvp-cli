import { resolve } from 'path'
import { readFileSync } from 'fs-extra'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Animal from './objects/animal'
import Snake from './objects/snake'
import Horse from './objects/horse'
import Counter from './react/Counter'


const PACKAGE_JSON = readFileSync(resolve(__dirname, '../package.json'))

export const run = (): void => {
  const sam = new Snake('Sammy the Python')
  const tom: Animal = new Horse('Tommy the Palomino')

  sam.move()
  tom.move(34)

  // eslint-disable-next-line no-console
  console.log(PACKAGE_JSON)

  // eslint-disable-next-line no-console
  console.log(renderToStaticMarkup(createElement(Counter)))
}
