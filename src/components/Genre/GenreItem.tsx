import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { IGenre } from '../../interfaces';

interface IProps extends PropsWithChildren {
  genre: IGenre;
}

const GenreItem: FC<IProps> = ({ genre }) => {
  const navigate = useNavigate();

  const handleClick = (name: string, id: number) => {
    navigate(`genre/${name.toLowerCase()}/${id}`);
  };

  return (
    <li>
      <Button onClick={() => handleClick(genre.name, genre.id)}>{genre?.name}</Button>
    </li>
  );
};

export default GenreItem;
