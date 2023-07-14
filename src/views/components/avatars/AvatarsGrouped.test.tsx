import React from 'react'
import { render, screen } from '@testing-library/react'
import AvatarsGrouped from './AvatarsGrouped'

test('renders AvatarsGrouped correctly', () => {
  render(<AvatarsGrouped />)

  const avatars = screen.getAllByAltText(/Olivia Sparks|Howard Lloyd|Hallie Richards|Alice Cobb|Jeffery Warner/)
  expect(avatars.length).toBe(9)
})
