import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../app/App'

test('renders marketplace & shops title', () => {
  render(<App />)
  const linkElement = screen.getByText(/marketplace & shops/i)
  console.log(linkElement)
  expect(linkElement).toBeInTheDocument()
})
