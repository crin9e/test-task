import { useLocation } from 'react-router-dom';
import { useGetCocktailsQuery } from '../../store/api/cocktailsApi';
import { DrinkCard } from '../../components/DrinkCard/DrinkCard';

export const DrinkPage: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1];
  const { data, error } = useGetCocktailsQuery(currentTab);
  return (
    <>
      {error && <div>There is an error</div>}
      {data?.length && (
        <div>
          {data.map(drinkData => (
            <DrinkCard key={drinkData.idDrink} drinkData={drinkData} />
          ))}
        </div>
      )}
    </>
  );
};
