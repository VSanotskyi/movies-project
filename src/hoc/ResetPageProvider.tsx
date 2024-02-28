import { createContext, FC, PropsWithChildren, useState } from 'react';

interface IProps extends PropsWithChildren {

}

interface IUpdatePageContext {
  isReset: boolean;
  setIsReset: (prev: boolean) => void;
}

export const ResetPageContext = createContext<IUpdatePageContext | null>(null);

const ResetPageProvider: FC<IProps> = ({ children }) => {
  const [isReset, setIsReset] = useState(false);

  const contextValue = {
    isReset,
    setIsReset,
  };

  return (
    <ResetPageContext.Provider value={contextValue}>
      {children}
    </ResetPageContext.Provider>
  );
};

export default ResetPageProvider;
