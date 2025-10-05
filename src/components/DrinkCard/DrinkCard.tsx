import { memo } from 'react';
import type { DrinkTypeT } from '../../types';

interface DrinkCardPropsI {
  drinkData: DrinkTypeT;
}

export const DrinkCard: React.FC<DrinkCardPropsI> = memo(({ drinkData }) => {
  const measureKeys = Object.keys(drinkData).filter(key =>
    key.includes('strMeasure')
  ) as (keyof DrinkTypeT)[];

  const ingredientKeys = Object.keys(drinkData).filter(key =>
    key.includes('strIngredient')
  ) as (keyof DrinkTypeT)[];

  return (
    <div>
      <h1>{drinkData.strDrink}</h1>
      <div>
        <div>{drinkData.strCategory}</div>
        <div>{drinkData.strAlcoholic}</div>
        <div>{drinkData.strGlass}</div>
      </div>
      <div>
        <div>Instructions:</div>
        <div>{drinkData.strInstructions}</div>
      </div>
      <div>
        <div>List of Ingredients</div>
        <div>
          {measureKeys.map((measure, index) => (
            <div>
              <div>{drinkData[measure]}</div>
              <div>{drinkData[ingredientKeys[index]]}</div>
            </div>
          ))}
        </div>
      </div>
      <img
        src={drinkData.strDrinkThumb}
        alt={`A picture of ${drinkData.strDrink}`}
        loading="lazy"
      />
    </div>
  );
});
