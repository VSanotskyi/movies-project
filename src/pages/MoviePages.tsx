import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { api } from '../services';
import { IMovie } from '../interfaces';

import { LoadingContext } from '../hoc';
import { List, MovieItem, PaginationContainer } from '../components';

const MoviePages = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const loading = useContext(LoadingContext);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // @ts-ignore
  const [page, setPage] = useState(+paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);

  const getMovies = async (page: number) => {
    try {
      const { data } = await api.getAll(page);
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

    getMovies(page);

  }, [page, setParamsPage]);

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
    </div>
  );
};

export { MoviePages };




