import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Button from '../Button'

test('calls onClick prop when <button> is clicked', () => {
  const onClick = jest.fn()
  const { getByText } = render(<Button onClick={onClick}>Go!</Button>)

  fireEvent.click(getByText('Go!'))

  expect(onClick).toHaveBeenCalledWith()
  expect(onClick).toHaveBeenCalledTimes(1)
})
