import { FC, PropsWithChildren } from 'react';

import css from './NotFound.module.css';

interface IProps extends PropsWithChildren {
  message: string;
}

const NotFound: FC<IProps> = ({ message }) => {
  return (
    <p className={css.title}>
      "{message}" not found
    </p>
  );
};

export default NotFound;
