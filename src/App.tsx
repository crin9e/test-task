import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { DrinkPage } from './pages/DrinkPage/DrinkPage';
import { cocktailCodes } from './constants';
import { NotFoundPage } from './pages/DrinkPage/NotFoundPage/NotFound';
import styles from './styles/App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Navigation tabs={cocktailCodes} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${cocktailCodes[0]}`} replace />}
          />
          <Route path="/:cocktailCode" element={<DrinkPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
