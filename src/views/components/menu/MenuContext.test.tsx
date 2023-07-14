import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MenuContext from './MenuContext'

test('renders MenuContext correctly', () => {
  const { getByText, getByRole } = render(<MenuContext />)

  // Assert that the text content is rendered
  const textContent = getByText(/Apple pie/i)
  expect(textContent).toBeInTheDocument()

  // Assert that the menu is closed initially
  const menu = getByRole('menu', { hidden: true })
  expect(menu).not.toBeVisible()

  // Simulate right-clicking on the component to open the menu
  fireEvent.contextMenu(textContent)

  // Assert that the menu is open
  expect(menu).toBeVisible()

  // Simulate clicking on a menu item
  const copyMenuItem = getByText('Copy')
  fireEvent.click(copyMenuItem)

  // Assert that the menu is closed after clicking a menu item
  expect(menu).not.toBeVisible()
})
