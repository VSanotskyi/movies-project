import { useContext } from 'react';

import { LoadingContext } from '../hoc';

const useLoadingContext = () => useContext(LoadingContext);

export { useLoadingContext };
