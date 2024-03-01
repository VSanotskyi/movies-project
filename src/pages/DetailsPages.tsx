import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from '../services';
import { IDetails } from '../interfaces';
import { DetailsItem, Error } from '../components';
import { LoadingContext, ErrorContext } from '../hoc';

const DetailsPages = () => {
  window.scrollTo(0, 0);

  const loading = useContext(LoadingContext);
  const error = useContext(ErrorContext);
  const [movieDetails, setMovieDetails] = useState<IDetails | null>(null);
  const { pathname } = useLocation();
  const movieId = pathname.split('/')[pathname.split('/').length - 1];

  const getDetails = async (id: string) => {
    loading?.setIsLoading(true);
    error?.setError(null);
    try {
      const { data } = await api.getDetailsMovie(id);
      setMovieDetails(data);
    } catch (err) {
      const e = err as Error;

      error?.setError(e.message);
    } finally {
      loading?.setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetails(movieId);
  }, [movieId]);

  return (
    <div>
      {movieDetails && <DetailsItem item={movieDetails} />}
      {error?.error && <Error title={error.error} />}
    </div>
  );
};

export { DetailsPages };
