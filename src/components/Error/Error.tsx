import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import css from './Error.module.css';

interface IProps extends PropsWithChildren {
  title: string;
}

const Error: FC<IProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box className={css.box}>
      <Typography variant="h6"
                  gutterBottom
      >

        {title}
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
