import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import MenuBasic from './MenuBasic'

describe('MenuBasic', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<MenuBasic />)
  })

  test('renders correctly', () => {
    const { queryByText } = component

    expect(queryByText('Open Menu')).toBeInTheDocument()
  })

  test('opens and closes menu on button click', () => {
    const { getByText, queryByText } = component

    const openMenuButton = getByText('Open Menu')
    fireEvent.click(openMenuButton)

    const profileMenuItem = queryByText('Profile')
    expect(profileMenuItem).toBeInTheDocument()
  })
})
