import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';
import { List, MovieItem, PaginationContainer, Error } from '../components';
import { ResetPageContext, LoadingContext, ErrorContext } from '../hoc';

const GenrePages = () => {
  const { pathname } = useLocation();
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const resPage = useContext(ResetPageContext);
  const loading = useContext(LoadingContext);
  const error = useContext(ErrorContext);
  const [movies, setMovies] = useState<IMovie[]>([]);
  // @ts-ignore
  const [page, setPage] = useState(paramsPage.get('page') ? +(paramsPage.get('page')) : 1);
  const [totalPage, setTotalPage] = useState(0);

  const genreId = pathname.split('/')[pathname.split('/').length - 1];

  const getMovies = async (id: string, page: number) => {
    loading?.setIsLoading(true);
    error?.setError(null);
    try {
      const { data } = await api.getByGenre(id, page);
      setMovies(data.results);
      setTotalPage(data['total_pages']);
    } catch (err) {
      const e = err as Error;

      error?.setError(e.message);
    } finally {
      loading?.setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    resPage?.setIsReset(false);
  };

  useEffect(() => {
    resPage?.isReset && setPage(1);
  }, [resPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    getMovies(genreId, page);
  }, [genreId, page, setParamsPage, error?.error, loading?.isLoading]);

  return (
    <div>
      {movies?.length > 0 && (
        <List items={movies}
              renderItem={(item: IMovie) => (
                <MovieItem key={item.id}
                           item={item}
                />)}
        />
      )}
      {totalPage !== 0 && (
        <PaginationContainer totalPage={totalPage}
                             page={page}
                             handleChange={handleChange}
        />)}

      {error?.error && <Error title={error.error} />}
    </div>
  );
};

export { GenrePages };
