import React from 'react'
import {mount} from 'enzyme'

import Button from '../Button'

test('calls onClick prop when <button> is clicked', () => {
  const onClick = jest.fn()
  const button = mount(<Button onClick={onClick}>Go!</Button>)

  button.simulate('click')

  expect(onClick).toHaveBeenCalledWith()
  expect(onClick).toHaveBeenCalledTimes(1)
})
