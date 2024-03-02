import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { IGenre } from '../../interfaces';
import { useResetPageContext } from '../../hooks';

interface IProps {
  genre: IGenre;
}

const GenreItem: FC<IProps> = ({ genre }) => {
  const navigate = useNavigate();

  const resetPage = useResetPageContext();

  const handleClick = (name: string, id: number) => {
    resetPage?.setIsReset(true);
    navigate(`/genre/${name.toLowerCase()}/${id}`);
  };

  return (
    <li>
      <Button onClick={() => handleClick(genre.name, genre.id)}>{genre?.name}</Button>
    </li>
  );
};

export { GenreItem };
