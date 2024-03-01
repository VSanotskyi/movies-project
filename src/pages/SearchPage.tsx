import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';
import { List, MovieItem, PaginationContainer } from '../components';

const SearchPage = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // @ts-ignore
  const [page, setPage] = useState(+paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);
  const { pathname } = useLocation();

  const search = pathname.split('/')[pathname.split('/').length - 1];

  const getMoviesBySearch = async (search: string, page: number) => {
    try {
      const { data } = await api.getSearchMovies(search, page);
      setTotalPage(data.total_pages);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    getMoviesBySearch(search, page);
  }, [setParamsPage, page, search]);

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
    </div>
  );
};

export { SearchPage };
