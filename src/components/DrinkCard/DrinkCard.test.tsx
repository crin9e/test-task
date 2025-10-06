import { vi } from 'vitest';
import { mockScrollTo, render, screen } from '../../testUtils';
import { DrinkCard } from './DrinkCard';
import type { DrinkTypeT } from '../../types';
import styles from './DrinkCard.module.scss';

describe('DrinkCard', () => {
  const mockDrinkData: DrinkTypeT = {
    idDrink: 1,
    strDrink: 'Margarita',
    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Cocktail glass',
    strInstructions: 'Test instructions',
    strDrinkThumb: 'test-image.jpg',
    strIngredient1: 'Tequila',
    strIngredient2: 'Triple sec',
    strIngredient3: 'Lime juice',
    strIngredient4: 'Salt',
    strIngredient5: null,
    strIngredient6: null,
    strIngredient7: null,
    strIngredient8: null,
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null,
    strMeasure1: '1 1/2 oz',
    strMeasure2: '1/2 oz',
    strMeasure3: '1 oz',
    strMeasure4: null,
    strMeasure5: null,
    strMeasure6: null,
    strMeasure7: null,
    strMeasure8: null,
    strMeasure9: null,
    strMeasure10: null,
    strMeasure11: null,
    strMeasure12: null,
    strMeasure13: null,
    strMeasure14: null,
    strMeasure15: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all drink information correctly', () => {
    render(<DrinkCard drinkData={mockDrinkData} />);

    // Check main drink name
    expect(
      screen.getByRole('heading', { level: 2, name: 'Margarita' })
    ).toBeInTheDocument();

    // Check drink details
    expect(screen.getByText('Ordinary Drink')).toBeInTheDocument();
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
    expect(screen.getByText('Cocktail glass')).toBeInTheDocument();

    // Check instructions
    expect(
      screen.getByRole('heading', { level: 3, name: 'Instructions:' })
    ).toBeInTheDocument();

    expect(screen.getByText('Test instructions')).toBeInTheDocument();

    // Check ingredients section header
    expect(
      screen.getByRole('heading', { level: 3, name: 'List of Ingredients' })
    ).toBeInTheDocument();
  });

  test('renders ingredients and measures in a list, does not render the null fields', () => {
    render(<DrinkCard drinkData={mockDrinkData} />);

    // Check that ingredients and measures list is present
    const ingredientsList = screen.getAllByRole('term');
    const measuresList = screen.getAllByRole('definition');

    // Check individual ingredients and measures
    expect(ingredientsList).toHaveLength(4);
    expect(measuresList).toHaveLength(3);
  });

  test('renders drink image with correct attributes', () => {
    render(<DrinkCard drinkData={mockDrinkData} />);

    const image = screen.getByAltText('A picture of a Margarita');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveClass(styles.drinkImg);
  });

  test('applies correct CSS classes', () => {
    render(<DrinkCard drinkData={mockDrinkData} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass(styles.drinkCard);

    const imageContainer = screen.getByRole('figure');
    expect(imageContainer).toHaveClass(styles.imgContainer);

    const descriptionSection = article.querySelector(`.${styles.drinkDesc}`);
    expect(descriptionSection).toBeInTheDocument();
  });

  test('calls scrollTo when drinkData changes', () => {
    const { rerender } = render(<DrinkCard drinkData={mockDrinkData} />);

    // Should call scrollTo on initial render
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Create new drink data
    const newDrinkData: DrinkTypeT = {
      ...mockDrinkData,
      idDrink: 2,
      strDrink: 'New Cocktail',
    };

    // Re-render with new data
    rerender(<DrinkCard drinkData={newDrinkData} />);

    // Should call scrollTo again with new data
    expect(mockScrollTo).toHaveBeenCalledTimes(2);
    expect(mockScrollTo).toHaveBeenLastCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  test('handles empty or missing fields gracefully', () => {
    const incompleteDrinkData: DrinkTypeT = {
      ...mockDrinkData,
      strCategory: '',
      strAlcoholic: '',
      strInstructions: '',
    };

    render(<DrinkCard drinkData={incompleteDrinkData} />);

    // Component should still render
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Margarita' })
    ).toBeInTheDocument();
  });

  test('is memoized to prevent unnecessary re-renders', () => {
    const { rerender } = render(<DrinkCard drinkData={mockDrinkData} />);

    // Store initial render count of scrollTo
    const initialScrollCount = mockScrollTo.mock.calls.length;

    // Re-render with same props
    rerender(<DrinkCard drinkData={mockDrinkData} />);

    // scrollTo should not be called again with same props due to memoization
    expect(mockScrollTo).toHaveBeenCalledTimes(initialScrollCount);
  });
});
