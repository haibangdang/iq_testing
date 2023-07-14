import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import MenuSelected from './MenuSelected'

test('renders MenuSelected correctly', () => {
  render(<MenuSelected />)

  // Assert that the menu is closed initially
  const menu = screen.queryByRole('menu')
  expect(menu).not.toBeInTheDocument()

  // Simulate clicking on the list item to open the menu
  fireEvent.click(screen.getByLabelText('when device is locked'))

  // Assert that the menu is open
  const menuOptions = screen.getAllByRole('menuitem')
  expect(menuOptions).toHaveLength(4)

  // Simulate clicking on a menu option
  fireEvent.click(menuOptions[2])

  // Assert that the menu is closed after selecting an option
  expect(menu).not.toBeInTheDocument()
})
