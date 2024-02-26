import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import api from '../services/moviesService';
import { IMovie } from '../interfaces';
import List from '../components/List/List';
import MovieItem from '../components/Movie/MovieItem';
import PaginationContainer from '../components/PaginationContainer/PaginationContainer';

const GenrePages = () => {
  const { pathname } = useLocation();
  const [paramsPage, setParamsPage] = useSearchParams({ page: '1' });
  const [movies, setMovies] = useState<IMovie[]>([]);
  // @ts-ignore
  const [page, setPage] = useState(paramsPage.get('page') ? +(paramsPage.get('page')) : 1);
  const [totalPage, setTotalPage] = useState(0);

  const genreId = pathname.split('/')[4];
  console.log(genreId);
  const getMovies = async (id: string, page: number) => {
    try {
      const { data } = await api.getByGenre(id, page);
      setMovies(data.results);
      setTotalPage(data['total_pages']);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [genreId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setParamsPage({ page: page.toString() });

    getMovies(genreId, page);
  }, [genreId, page]);

  return (
    <div>
      {movies && (
        <>
          <List
            items={movies}
            renderItem={(item: IMovie) => (
              <MovieItem key={item.id}
                         item={item}
              />
            )}
          />
          <PaginationContainer totalPage={totalPage}
                               page={page}
                               handleChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default GenrePages;
