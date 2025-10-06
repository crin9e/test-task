import { Routes, Route, Navigate } from 'react-router-dom';
import { DrinkPage } from './pages/DrinkPage/DrinkPage';
import { cocktailCodes } from './constants';
import { NotFoundPage } from './pages/DrinkPage/NotFoundPage/NotFound';
import { Layout } from './components/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${cocktailCodes[0]}`} replace />}
        />
        <Route path="/:cocktailCode" element={<DrinkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
