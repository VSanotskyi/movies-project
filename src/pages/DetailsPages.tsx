import DetailsItem from '../components/Details/DetailsItem';
import { useEffect, useState } from 'react';
import { IDetails } from '../interfaces/detailsInterface';
import { useLocation } from 'react-router-dom';
import { api } from '../services/moviesService';

const DetailsPages = () => {
  window.scrollTo(0, 0);
  const [movieDetails, setMovieDetails] = useState<IDetails | null>(null);
  const { pathname } = useLocation();
  const movieId = pathname.split('/')[4];

  const getDetails = async (id: string) => {
    try {
      const { data } = await api.getDetailsMovie(id);
      setMovieDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails(movieId);
  }, [movieId]);

  return (
    <>
      {movieDetails && <DetailsItem item={movieDetails} />}
    </>
  );
};

export default DetailsPages;
