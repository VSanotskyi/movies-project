import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { useResetPageContext } from '../../hooks';
import css from './Error.module.css';

interface IProps {
  message: string;
}

const Error: FC<IProps> = ({ message }) => {
  const navigate = useNavigate();
  const resPage = useResetPageContext();

  const handleClick = () => {
    resPage?.setIsReset(true);
    navigate('/');
  };

  return (
    <Box className={css.box}>
      <Typography variant="h6"
                  gutterBottom
      >

        {message}
      </Typography>
      <Button variant="contained"
              endIcon={<HomeIcon />}
              onClick={handleClick}
      >
        Go home
      </Button>
    </Box>
  );
};

export { Error };
