import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from './Layout/Layout';
import MoviePages from './pages/MoviePages';
import DetailsPages from './pages/DetailsPages';
import GenrePages from './pages/GenrePages';

const router = createBrowserRouter([
  {
    path: '/movies-project', element: <Layout />, children: [
      { index: true, element: <Navigate to="movies" /> },
      {
        path: 'movies', element: <MoviePages />, children: [],
      },
      { path: 'movies/:search', element: <MoviePages /> },
      { path: 'genre/:name/:id', element: <GenrePages /> },
      { path: 'movies/details/:id', element: <DetailsPages /> },
    ],
  },
]);

export {
  router,
};
