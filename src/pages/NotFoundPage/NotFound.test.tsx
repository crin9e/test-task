import { vi } from 'vitest';
import { mockLink, render, screen } from '../../testUtils';
import { NotFoundPage } from './NotFound';

vi.mock('react-router-dom', () => ({
  Link: mockLink,
}));

describe('NotFoundPage', () => {
  test('renders not found message and return link', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('Drink not found!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'return' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
