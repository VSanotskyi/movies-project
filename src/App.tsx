import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import {
  MoviePages,
  GenrePages,
  SearchPage,
  DetailsPages,
  ErrorPages,
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/"
             element={<Layout />}
      >
        <Route index
               element={<MoviePages />}
        />
        <Route path={'/genre/:name/:id'}
               element={<GenrePages />}
        />
        <Route path={'/details/:id'}
               element={<DetailsPages />}
        />
        <Route path={'/search/:searchName'}
               element={<SearchPage />}
        />
      </Route>
      <Route path="*"
             element={<ErrorPages />}
      />
    </Routes>
  );
};

export default App;
