import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';
import { useResetPageContext } from '../hooks';
import { Error, List, MovieItem, PaginationContainer, Loading } from '../components';

const SearchPage = () => {
  const { pathname } = useLocation();
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const [page, setPage] = useState(isNaN(+(paramsPage.get('page'))) ? 1 : +(paramsPage.get('page')));
  const [totalPage, setTotalPage] = useState(0);
  
  const resPage = useResetPageContext();

  const search = pathname.split('/')[pathname.split('/').length - 1];

  const getMoviesBySearch = async (search: string, page: number) => {
    setIsLoading(true);
    try {
      const { data } = await api.getSearchMovies(search, page);
      setTotalPage(data.total_pages);
      setMovies(data.results);
    } catch (err) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    resPage?.setIsReset(false);
  };

  useEffect(() => {
    resPage?.isReset && setPage(1);
  }, [resPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    getMoviesBySearch(search, page);
  }, [setParamsPage, page, search]);

  return (
    <div>
      {isLoading && <Loading />}
      {movies && movies?.length > 0 && !error && (
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
      {error && <Error message={error} />}
    </div>
  );
};

export { SearchPage };
