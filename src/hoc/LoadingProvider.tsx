import { createContext, FC, PropsWithChildren, useState } from 'react';

interface IProps extends PropsWithChildren {

}

type contextType = {
  isLoading: boolean
  setIsLoading: (p: boolean) => void
}

const LoadingContext = createContext<contextType | null>(null);

const LoadingProvider: FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
