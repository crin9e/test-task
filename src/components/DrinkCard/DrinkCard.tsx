import { memo, useEffect } from 'react';
import type { DrinkTypeT } from '../../types';
import styles from './DrinkCard.module.scss';

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [drinkData]);

  return (
    <div className={styles.drinkCard}>
      <div className={styles.drinkDesc}>
        <h3>{drinkData.strDrink}</h3>
        <div>
          <div>{drinkData.strCategory}</div>
          <div>{drinkData.strAlcoholic}</div>
          <div>{drinkData.strGlass}</div>
        </div>
        <div>
          <h4>Instructions:</h4>
          <div>{drinkData.strInstructions}</div>
        </div>
        <div>
          <h4>List of Ingredients</h4>
          <div className={styles.ingredientsContainer}>
            <div className={styles.measuresAndIngredientsList}>
              {ingredientKeys.map(ingredientKey =>
                drinkData[ingredientKey] ? (
                  <div>{drinkData[ingredientKey]}</div>
                ) : null
              )}
            </div>
            <div className={styles.measuresAndIngredientsList}>
              {measureKeys.map(measureKey =>
                drinkData[measureKey] ? (
                  <div>{drinkData[measureKey]}</div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img
          className={styles.drinkImg}
          src={drinkData.strDrinkThumb}
          alt={`A picture of a ${drinkData.strDrink}`}
          loading="lazy"
        />
      </div>
    </div>
  );
});
