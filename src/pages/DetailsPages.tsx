import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from '../services';
import { IDetails } from '../interfaces';
import { DetailsItem } from '../components';

const DetailsPages = () => {
  window.scrollTo(0, 0);

  const [movieDetails, setMovieDetails] = useState<IDetails | null>(null);
  const { pathname } = useLocation();
  const movieId = pathname.split('/')[pathname.split('/').length - 1];

  const getDetails = async (id: string) => {
    try {
      const { data } = await api.getDetailsMovie(id);
      setMovieDetails(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDetails(movieId);
  }, [movieId]);

  return (
    <div>
      {movieDetails && <DetailsItem item={movieDetails} />}
    </div>
  );
};

export { DetailsPages };
