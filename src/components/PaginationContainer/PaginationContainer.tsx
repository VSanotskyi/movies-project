import React, { ChangeEvent, FC, PropsWithChildren } from 'react';

import { Box, Stack, Pagination, PaginationItem } from '@mui/material';

import { useThemeContext } from '../../hooks';
import css from './PaginationContainer.module.css';

interface IProps extends PropsWithChildren {
  totalPage: number;
  page: number;
  handleChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const PaginationContainer: FC<IProps> = ({ totalPage, page, handleChange }) => {
  const theme = useThemeContext();

  return (
    <Box className={css[`${theme?.theme}`]}>
      <Stack spacing={2}>
        <Pagination color="primary"
                    count={totalPage < 500 ? totalPage : 500}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                      />
                    )}
        />
      </Stack>
    </Box>
  );
};

export { PaginationContainer };
