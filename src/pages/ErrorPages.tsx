import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

const ErrorPages = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box display={'flex'}
         flexDirection={'column'}
         alignItems={'center'}
    >
      <Typography variant="h6"
                  gutterBottom
      >
        Error, Page not found :(
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

export { ErrorPages };
