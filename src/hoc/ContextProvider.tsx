import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

import { IGenre } from '../interfaces';
import { api } from '../services/moviesService';

type contextType = {
  genres: IGenre[];
  setGenres: (data: IGenre[]) => void;
}

export const Context = createContext<contextType | null>(null);

interface IProps extends PropsWithChildren {

}

const ContextProvider: FC<IProps> = ({ children }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  const getGenres = async () => {
    try {
      const { data } = await api.getAllGenres();
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  const valueContext = {
    genres,
    setGenres,
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <Context.Provider value={valueContext}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
