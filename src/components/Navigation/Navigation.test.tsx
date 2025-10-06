import { vi } from 'vitest';
import { mockLink, render, screen } from '../../testUtils';
import { Navigation } from './Navigation';
import styles from './Navigation.module.scss';

const { mockUseLocation } = vi.hoisted(() => ({
  mockUseLocation: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: mockUseLocation,
  Link: mockLink,
}));

describe('Navigation', () => {
  const mockTabs = ['mojito', 'margarita'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all navigation tabs', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
    });

    render(<Navigation tabs={mockTabs} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check all tabs are rendered
    mockTabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });

    // Check all links have correct href
    expect(screen.getByTestId('link-/mojito')).toHaveAttribute(
      'href',
      '/mojito'
    );
    expect(screen.getByTestId('link-/margarita')).toHaveAttribute(
      'href',
      '/margarita'
    );
  });

  test('highlights the active tab based on current URL', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/mojito',
    });

    render(<Navigation tabs={mockTabs} />);

    const activeTab = screen.getByRole('link', { name: 'mojito' });
    const inactiveTab = screen.getByRole('link', { name: 'margarita' });

    expect(activeTab).toBeVisible();
    expect(inactiveTab).toBeVisible();
    expect(activeTab).toHaveAttribute('href', '/mojito');
    expect(inactiveTab).toHaveAttribute('href', '/margarita');
    expect(activeTab.className).not.toBe(inactiveTab.className);
  });

  test('highlights first tab when pathname is root', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
    });

    render(<Navigation tabs={mockTabs} />);

    const activeTab = screen.getByRole('link', { name: 'mojito' });
    const inactiveTab = screen.getByRole('link', { name: 'margarita' });

    expect(activeTab).toBeVisible();
    expect(inactiveTab).toBeVisible();
    expect(activeTab).toHaveAttribute('href', '/mojito');
    expect(inactiveTab).toHaveAttribute('href', '/margarita');
    expect(activeTab.className).not.toBe(inactiveTab.className);
  });

  test('works with empty tabs array', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
    });

    render(<Navigation tabs={[]} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // No links should be rendered
    expect(screen.queryByTestId(/link-/)).not.toBeInTheDocument();
  });

  test('applies correct CSS classes structure', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
    });

    render(<Navigation tabs={mockTabs} />);

    const nav = screen.getByRole('navigation');
    const tabsContainer = nav.querySelector(`.${styles.tabsContainer}`);
    const activeTab = screen.getByTestId('link-/mojito');

    expect(tabsContainer).toBeInTheDocument();
    expect(activeTab).toHaveClass(styles.tab);
    expect(activeTab).toHaveClass(styles.active);
  });

  test('updates active tab when location changes', () => {
    const { rerender } = render(<Navigation tabs={mockTabs} />);

    // Initial render with mojito active
    mockUseLocation.mockReturnValue({
      pathname: '/mojito',
    });

    rerender(<Navigation tabs={mockTabs} />);
    expect(screen.getByTestId('link-/mojito')).toHaveClass(styles.active);

    // Re-render with margarita active
    mockUseLocation.mockReturnValue({
      pathname: '/margarita',
    });

    rerender(<Navigation tabs={mockTabs} />);
    expect(screen.getByTestId('link-/margarita')).toHaveClass(styles.active);
    expect(screen.getByTestId('link-/mojito')).not.toHaveClass(styles.active);
  });
});
