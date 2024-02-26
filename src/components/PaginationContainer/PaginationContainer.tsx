import React, {ChangeEvent, FC, PropsWithChildren, useContext} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {ThemeContext} from '../../hoc/ThemProvider';
import Box from '@mui/material/Box';

import css from './PaginationContainer.module.css';
import {PaginationItem} from '@mui/material';

interface IProps extends PropsWithChildren {
    totalPage: number;
    page: number;
    handleChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const PaginationContainer: FC<IProps> = ({totalPage, page, handleChange}) => {
    const theme = useContext(ThemeContext);

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

export default PaginationContainer;