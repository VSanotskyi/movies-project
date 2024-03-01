import { useContext } from 'react';

import { GenreContext } from '../hoc';

const useGenreContext = () => useContext(GenreContext);

export { useGenreContext };
