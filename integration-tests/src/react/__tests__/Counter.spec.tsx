import React from 'react'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'

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
  const buttonOnClick = button.prop('onClick')

  if (buttonOnClick) {
    // simulate clicking the button by trigger onClick prop of <Button />
    act(() => {
      buttonOnClick()
    })
  }

  expect(counter).toIncludeText('You clicked 6 times')
})
