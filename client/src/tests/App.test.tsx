import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../app/App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/marketplace/i)
  console.log(linkElement)
  expect(linkElement).toBeInTheDocument()
})
