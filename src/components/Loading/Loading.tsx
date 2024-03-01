import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import css from './Loading.module.css';

const Loading = () => {
  return (
    <Box className={css.box}>
      <CircularProgress size={20}
                        color={'inherit'}
      />
      <span className={css.text}>Loading...</span>
    </Box>
  );
};

export default Loading;
