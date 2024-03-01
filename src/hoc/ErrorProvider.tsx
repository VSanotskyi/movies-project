import { createContext, FC, PropsWithChildren, useState } from 'react';

interface IProps extends PropsWithChildren {

}

type contextType = {
  error: string | null
  setError: (p: string | null) => void
}

const ErrorContext = createContext<contextType | null>(null);

const ErrorProvider: FC<IProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const contextValue = {
    error, setError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, ErrorContext };
