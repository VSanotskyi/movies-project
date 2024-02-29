import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from './Layout/Layout';
import MoviePages from './pages/MoviePages';
import DetailsPages from './pages/DetailsPages';
import GenrePages from './pages/GenrePages';
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
  {
    path: 'movies-project-without-redux', element: <Layout />, children: [
      { index: true, element: <Navigate to="movies" /> },
      { path: 'movies', element: <MoviePages /> },
      { path: 'genre/:name/:id', element: <GenrePages /> },
      { path: 'movies/details/:id', element: <DetailsPages /> },
      { path: 'movies/search/:search', element: <SearchPage /> },
    ],
  },
]);

export {
  router,
};
