import { render, screen } from '@testing-library/react'
import App from '../src/App'

test('renders welcome message', () => {
  render(<App />)
  expect(screen.getByText(/Welcome to Chord Changer/i)).toBeInTheDocument()
})
