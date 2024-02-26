import { api } from '../services/moviesService';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { IMovie } from '../interfaces';
import List from '../components/List/List';
import MovieItem from '../components/Movie/MovieItem';
import PaginationContainer from '../components/PaginationContainer/PaginationContainer';

const SearchPage = () => {
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // @ts-ignore
  const [page, setPage] = useState(+paramsPage.get('page'));
  const [totalPage, setTotalPage] = useState(0);
  const { pathname } = useLocation();

  const search = pathname.split('/')[4];

  const getMoviesBySearch = async (search: string, page: number) => {
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

    getMoviesBySearch(search, page);
  }, [page, search, setParamsPage]);

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
        </>
      )}
    </>
  );
};

export default SearchPage;
