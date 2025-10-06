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
    <article className={styles.drinkCard}>
      <div className={styles.drinkDesc}>
        <header>
          <h2>{drinkData.strDrink}</h2>
          <div>
            <div>{drinkData.strCategory}</div>
            <div>{drinkData.strAlcoholic}</div>
            <div>{drinkData.strGlass}</div>
          </div>
        </header>
        <section>
          <h3>Instructions:</h3>
          <div>{drinkData.strInstructions}</div>
        </section>
        <section>
          <h3>List of Ingredients</h3>
          <dl className={styles.ingredientsList}>
            {ingredientKeys.map((ingredientKey, index) => {
              const ingredient = drinkData[ingredientKey];
              const measure = drinkData[measureKeys[index]];

              return ingredient ? (
                <div key={ingredientKey} className={styles.ingredientItem}>
                  {ingredient && <dt>{ingredient}</dt>}
                  {measure && <dd>{measure}</dd>}
                </div>
              ) : null;
            })}
          </dl>
        </section>
      </div>
      <figure className={styles.imgContainer}>
        <img
          className={styles.drinkImg}
          src={drinkData.strDrinkThumb}
          alt={`A picture of a ${drinkData.strDrink}`}
          loading="lazy"
        />
      </figure>
    </article>
  );
});
