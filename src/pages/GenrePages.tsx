import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';
import { Error, List, MovieItem, PaginationContainer, Loading } from '../components';
import { useResetPageContext } from '../hooks';

const GenrePages = () => {
  const { pathname } = useLocation();
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const [page, setPage] = useState(isNaN(+(paramsPage.get('page'))) ? 1 : +(paramsPage.get('page')));
  const [totalPage, setTotalPage] = useState(0);
  
  const resPage = useResetPageContext();

  const genreId = pathname.split('/')[pathname.split('/').length - 1];

  const getMovies = async (id: string, page: number) => {
    setIsLoading(true);
    try {
      const { data } = await api.getByGenre(id, page);
      setMovies(data.results);
      setTotalPage(data['total_pages']);
    } catch (err) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
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
  }, [genreId, page, setParamsPage]);

  return (
    <div>
      {isLoading && <Loading />}
      {movies?.length > 0 && !error && (
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
      {error && <Error message={error} />}
    </div>
  );
};

export { GenrePages };
