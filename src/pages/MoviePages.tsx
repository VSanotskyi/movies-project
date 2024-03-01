import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';

import { LoadingContext, ErrorContext } from '../hoc';
import { Error, List, MovieItem, PaginationContainer } from '../components';

const MoviePages = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const loading = useContext(LoadingContext);
  const error = useContext(ErrorContext);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // @ts-ignore
  const [page, setPage] = useState(+paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);

  const getMovies = async (page: number) => {
    loading?.setIsLoading(true);
    try {
      const { data } = await api.getAll(page);

      error?.setError(null);

      setTotalPage(data.total_pages);
      setMovies(data.results);
    } catch (err) {
      const e = err as Error;
      error?.setError(e.message);
    } finally {
      loading?.setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    getMovies(page);

  }, [page, setParamsPage, error?.error, loading?.isLoading]);

  return (
    <div>
      {movies && movies.length > 0 && (
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
      {error?.error && <Error title={error.error} />}
    </div>
  );
};

export { MoviePages };




