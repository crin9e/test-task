import { useLocation } from 'react-router-dom';
import { useGetCocktailsQuery } from '../../store/api/cocktailsApi';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';
import { cocktailCodes } from '../../constants';
import { NotFoundPage } from '../NotFoundPage/NotFound';
import styles from './DrinkPage.module.scss';

export const DrinkPage: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1];
  const { data, isLoading, error } = useGetCocktailsQuery(currentTab);

  if (!cocktailCodes.includes(currentTab)) {
    return <NotFoundPage />;
  }

  return (
    <>
      {error && <div>There is an error</div>}
      {isLoading && <div>Loading...</div>}
      {data?.length && (
        <div className={styles.drinksContainer}>
          {data.map(drinkData => (
            <DrinkCard key={drinkData.idDrink} drinkData={drinkData} />
          ))}
        </div>
      )}
    </>
  );
};
