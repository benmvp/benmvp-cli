import React from 'react'

import Counter from '../Counter'
import Button from '../Button'

test('starts off at 0 by default', () => {
  const counter = mount(<Counter />)

  expect(counter).toIncludeText('You clicked 0 times')
})

test('can have a different initial value', () => {
  const counter = mount(<Counter initialCount={14} />)

  expect(counter).toIncludeText('You clicked 14 times')
})

test('updates count when Button is clicked', () => {
  const counter = mount(<Counter initialCount={5} />)
  const button = counter.find(Button)

  // simulate clicking the button by trigger onClick prop of <Button />
  button.prop('onClick')()

  counter.update()

  expect(counter).toIncludeText('You clicked 6 times')
})
