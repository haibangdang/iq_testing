import React from 'react'
import { render, screen } from '@testing-library/react'
import ButtonsText from './ButtonsText'

test('renders ButtonsText correctly', () => {
  render(<ButtonsText />)

  const primaryButton = screen.getByText('Primary')
  expect(primaryButton).toBeInTheDocument()

  const secondaryButton = screen.getByText('Secondary')
  expect(secondaryButton).toBeInTheDocument()

  const disabledButton = screen.getByText('Disabled')
  expect(disabledButton).toBeInTheDocument()

  const linkButton = screen.getByText('Link')
  expect(linkButton).toBeInTheDocument()
})
