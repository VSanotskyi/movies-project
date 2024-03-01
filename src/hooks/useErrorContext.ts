import { useContext } from 'react';

import { ErrorContext } from '../hoc';

const useErrorContext = () => useContext(ErrorContext);

export { useErrorContext };
