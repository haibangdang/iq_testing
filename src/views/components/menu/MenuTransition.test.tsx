import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import MenuTransition from './MenuTransition'

test('renders MenuTransition correctly', () => {
  render(<MenuTransition />)

  // Assert that the button is rendered
  const openButton = screen.getByRole('button', { name: 'Open with fade transition' })
  expect(openButton).toBeInTheDocument()

  // Assert that the menu is closed initially
  const menu = screen.queryByRole('menu')
  expect(menu).not.toBeInTheDocument()

  // Simulate clicking on the button to open the menu
  fireEvent.click(openButton)

  // Assert that the menu is open
  const menuItems = screen.getAllByRole('menuitem')
  expect(menuItems).toHaveLength(3)

  // Simulate clicking on a menu item
  fireEvent.click(menuItems[1])

  // Assert that the menu is closed after clicking a menu item
  expect(menu).not.toBeInTheDocument()
})
