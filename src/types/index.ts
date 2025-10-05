export type CocktailsResponseType = {
  drinks: DrinkTypeT[];
};

export type DrinkTypeT = {
  idDrink: number;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
} & {
  [K in `strIngredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}`]:
    | string
    | null;
} & {
  [K in `strMeasure${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}`]:
    | string
    | null;
};
