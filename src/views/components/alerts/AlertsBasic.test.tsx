import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import AlertsBasic from './AlertsBasic'

describe('AlertsBasic', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<AlertsBasic />)
  })

  test('closes alert on click', () => {
    const { queryByText } = component

    const closeButton = queryByText('×')
    if (closeButton) {
      fireEvent.click(closeButton)
    }

    const successAlert = queryByText('This is a success alert — check it out!')
    expect(successAlert).toBeNull()
  })
})
