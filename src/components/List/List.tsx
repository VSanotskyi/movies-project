import { ReactNode } from 'react';

import css from './List.module.css';

interface IProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>(props: IProps<T>) {
  return (
    <ul className={css.list}>
      {props.items.map(props.renderItem)}
    </ul>
  );
}

export { List };
