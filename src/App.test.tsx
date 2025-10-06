import { render, screen } from '../src/testUtils';
import App from './App';

describe('App', () => {
  test('renders navigation and main content', () => {
    render(<App />);

    // Check if navigation is present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // Check if it initially renders loading
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error since API call isnt mocked here', () => {
    render(<App />);

    // Since the API call isn't mocked here, look for the error
    expect(screen.getByText(/There is an error/i)).toBeInTheDocument();
  });
});
