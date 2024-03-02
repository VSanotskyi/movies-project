import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from '../services';
import { IDetails } from '../interfaces';
import { DetailsItem, Error, Loading } from '../components';

const DetailsPages = () => {
  const { pathname } = useLocation();
  const [movieDetails, setMovieDetails] = useState<IDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const movieId = pathname.split('/')[pathname.split('/').length - 1];

  const getDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.getDetailsMovie(id);
      setMovieDetails(data);
    } catch (err) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    getDetails(movieId);
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loading />}
      {movieDetails && !error && <DetailsItem item={movieDetails} />}
      {error && <Error message={error} />}
    </div>
  );
};

export { DetailsPages };
