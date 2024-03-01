import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';
import { Error, List, MovieItem, PaginationContainer } from '../components';
import { LoadingContext, ErrorContext } from '../hoc';

const SearchPage = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const loading = useContext(LoadingContext);
  const error = useContext(ErrorContext);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // @ts-ignore
  const [page, setPage] = useState(+paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);
  const { pathname } = useLocation();

  const search = pathname.split('/')[pathname.split('/').length - 1];

  const getMoviesBySearch = async (search: string, page: number) => {
    loading?.setIsLoading(true);
    error?.setError(null);
    try {
      const { data } = await api.getSearchMovies(search, page);
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

    getMoviesBySearch(search, page);
  }, [page, search, getMoviesBySearch, setParamsPage]);

  return (
    <div>
      {movies && movies?.length > 0 && (
        <List items={movies}
              renderItem={(item: IMovie) => <MovieItem key={item.id}
                                                       item={item}
              />}
        />
      )}
      {totalPage > 1 && (
        <PaginationContainer totalPage={totalPage}
                             page={page}
                             handleChange={handleChange}
        />
      )}
      {error?.error && <Error title={error.error} />}
      {error?.error === null && movies?.length === 0 && <Error title={'Not Found :('} />}
    </div>
  );
};

export { SearchPage };
