import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import api from '../services/moviesService';
import { IMovie } from '../interfaces';
import List from '../components/List/List';
import MovieItem from '../components/Movie/MovieItem';
import PaginationContainer from '../components/PaginationContainer/PaginationContainer';

const MoviePages = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // @ts-ignore
  const [page, setPage] = useState(+paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);
  const { pathname } = useLocation();

  // const search = pathname.split('/')[2];
  const search = null;
  console.log(pathname.split('/')[2]);

  const getMovies = async (page: number) => {
    try {
      const { data } = await api.getAll(page);
      setTotalPage(data.total_pages);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getMoviesBySeacrh = async (search: string, page: number) => {
    try {
      const { data } = await api.getSearchMovies(search, page);
      setTotalPage(data.total_pages);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    if (search) {
      getMoviesBySeacrh(search, page);
    } else {
      getMovies(page);
    }
  }, [page, search]);

  return (
    <>
      {movies && (
        <>
          <List items={movies}
                renderItem={(item: IMovie) => <MovieItem key={item.id}
                                                         item={item}
                />}
          />
          <PaginationContainer totalPage={totalPage}
                               page={page}
                               handleChange={handleChange}
          />
          {/*<Stack spacing={2}>*/}
          {/*    <Pagination count={totalPage < 500 ? totalPage : 500}*/}
          {/*                page={page}*/}
          {/*                onChange={handleChange}*/}
          {/*    />*/}
          {/*</Stack>*/}
        </>
      )}
    </>
  );
};

export default MoviePages;




