import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';
import { Error, List, MovieItem, PaginationContainer, Loading } from '../components';

const MoviePages = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const [page, setPage] = useState(isNaN(+paramsPage.get('page')) ? 1 : +paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);

  const getMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const { data } = await api.getAll(page);
      setTotalPage(data.total_pages);
      setMovies(data.results);
    } catch (err) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    getMovies(page);
  }, [page, setParamsPage, error]);

  return (
    <div>
      {isLoading && <Loading />}
      {movies && movies.length > 0 && !error && (
        <List items={movies}
              renderItem={(item: IMovie) => <MovieItem key={item.id}
                                                       item={item}
              />}
        />
      )}
      {totalPage > 0 && (
        <PaginationContainer totalPage={totalPage}
                             page={page}
                             handleChange={handleChange}
        />
      )}
      {error && <Error message={error} />}
    </div>
  );
};

export { MoviePages };




