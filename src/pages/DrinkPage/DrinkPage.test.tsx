import { vi } from 'vitest';
import { render, screen } from '../../testUtils';
import { DrinkPage } from './DrinkPage';
import type { DrinkTypeT } from '../../types';

const { mockUseLocation, mockUseGetCocktailsQuery } = vi.hoisted(() => ({
  mockUseLocation: vi.fn(),
  mockUseGetCocktailsQuery: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: mockUseLocation,
}));

vi.mock('../../store/api/cocktailsApi', () => ({
  useGetCocktailsQuery: mockUseGetCocktailsQuery,
}));

vi.mock('../../components/DrinkCard/DrinkCard', () => ({
  DrinkCard: ({ drinkData }: { drinkData: DrinkTypeT }) => (
    <div data-testid="drink-card">{drinkData.strDrink}</div>
  ),
}));

vi.mock('../NotFoundPage/NotFound', () => ({
  NotFoundPage: () => <div data-testid="not-found">Not Found Page Mock</div>,
}));

describe('DrinkPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders NotFoundPage for invalid cocktail code', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/invalid-drink',
    });

    mockUseGetCocktailsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
    });

    render(<DrinkPage />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/mojito',
    });

    mockUseGetCocktailsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    render(<DrinkPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/mojito',
    });

    mockUseGetCocktailsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });

    render(<DrinkPage />);

    expect(screen.getByText('There is an error')).toBeInTheDocument();
  });

  test('renders drink cards when data is available', () => {
    const mockDrinks = [
      {
        idDrink: '1',
        strDrink: 'Test Mojito',
        strDrinkThumb: 'mojito.jpg',
      },
      {
        idDrink: '2',
        strDrink: 'Test Martini',
        strDrinkThumb: 'martini.jpg',
      },
    ];

    mockUseLocation.mockReturnValue({
      pathname: '/mojito',
    });

    mockUseGetCocktailsQuery.mockReturnValue({
      data: mockDrinks,
      isLoading: false,
      error: undefined,
    });

    render(<DrinkPage />);

    expect(screen.getAllByTestId('drink-card')).toHaveLength(2);
    expect(screen.getByText('Test Mojito')).toBeInTheDocument();
    expect(screen.getByText('Test Martini')).toBeInTheDocument();
  });

  test('handles empty data array', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/mojito',
    });

    mockUseGetCocktailsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
    });

    render(<DrinkPage />);

    // Should not render any drink cards
    expect(screen.queryByTestId('drink-card')).not.toBeInTheDocument();
    // Should not show loading or error
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('There is an error')).not.toBeInTheDocument();
  });

  test('extracts currentTab correctly from pathname', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/cosmopolitan',
    });

    mockUseGetCocktailsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
    });

    render(<DrinkPage />);

    // Should call the API with 'cosmopolitan'
    expect(mockUseGetCocktailsQuery).toHaveBeenCalledWith('cosmopolitan');
  });
});
