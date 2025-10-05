import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { cocktailCodes } from './constants';
import { DrinkPage } from './pages/DrinkPage/DrinkPage';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navigation tabs={cocktailCodes} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${cocktailCodes[0]}`} replace />}
          />
          <Route path="/:cocktailCode" element={<DrinkPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
