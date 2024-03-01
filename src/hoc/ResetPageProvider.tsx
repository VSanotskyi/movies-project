import { createContext, FC, PropsWithChildren, useState } from 'react';

interface IProps extends PropsWithChildren {

}

type contextType = {
  isReset: boolean;
  setIsReset: (prev: boolean) => void;
}

const ResetPageContext = createContext<contextType | null>(null);

const ResetPageProvider: FC<IProps> = ({ children }) => {
  const [isReset, setIsReset] = useState(false);

  return (
    <ResetPageContext.Provider value={{ isReset, setIsReset }}>
      {children}
    </ResetPageContext.Provider>
  );
};

export { ResetPageProvider, ResetPageContext };
