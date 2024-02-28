import { FC, PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { IGenre } from '../../interfaces';
import { ResetPageContext } from '../../hoc/ResetPageProvider';

interface IProps extends PropsWithChildren {
  genre: IGenre;
}

const GenreItem: FC<IProps> = ({ genre }) => {
  const navigate = useNavigate();
  const resPage = useContext(ResetPageContext);

  const handleClick = (name: string, id: number) => {
    resPage?.setIsReset(true);
    navigate(`/movies-project/genre/${name.toLowerCase()}/${id}`);
  };

  return (
    <li>
      <Button onClick={() => handleClick(genre.name, genre.id)}>{genre?.name}</Button>
    </li>
  );
};

export default GenreItem;
