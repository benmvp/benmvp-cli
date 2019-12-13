import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Counter from '../Counter'

test('starts off at 0 by default', () => {
  const { queryByText } = render(<Counter />)

  expect(queryByText('You clicked 0 times')).toBeInTheDocument()
})

test('can have a different initial value', () => {
  const { queryByText } = render(<Counter initialCount={14} />)

  expect(queryByText('You clicked 14 times')).toBeInTheDocument()
})

test('updates count when Button is clicked', () => {
  const { queryByText, getByText } = render(<Counter initialCount={5} />)

  fireEvent.click(getByText('Click me'))

  expect(queryByText('You clicked 6 times')).toBeInTheDocument()
})
