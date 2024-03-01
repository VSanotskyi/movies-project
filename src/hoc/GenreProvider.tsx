import { FC, PropsWithChildren, useEffect, useState, createContext } from 'react';

import { IGenre } from '../interfaces';
import { api } from '../services/moviesService';

type contextType = {
  genres: IGenre[];
  setGenres: (data: IGenre[]) => void;
}

const GenreContext = createContext<contextType | null>(null);

interface IProps extends PropsWithChildren {

}

const GenreProvider: FC<IProps> = ({ children }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  const getGenres = async () => {
    try {
      const { data } = await api.getAllGenres();
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres, setGenres }}>
      {children}
    </GenreContext.Provider>
  );
};

export { GenreProvider, GenreContext };
