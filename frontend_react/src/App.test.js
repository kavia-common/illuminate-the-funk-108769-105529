import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site headline', () => {
  render(<App />);
  const headline = screen.getByText(/Illuminate the Funk/i);
  expect(headline).toBeInTheDocument();
});
