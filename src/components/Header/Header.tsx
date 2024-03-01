import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Input,
  InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import { IGenre } from '../../interfaces';
import { useThemeContext, useGenreContext } from '../../hooks';
import { List, GenreItem } from '../../components';
import css from './Header.module.css';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const genre = useGenreContext();
  const theme = useThemeContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search.length < 1) return;
    navigate(`/search/${search}`);
    setShowSearch(prev => !prev);
    setSearch('');
  };

  const handleChangeTheme = () => {
    theme?.toggleTheme();
  };

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
          >
            <Link className={css[`${theme?.theme}`]}
                  to={'/'}
            >Movies</Link>
          </Typography>
          {showSearch && <Typography variant="h6"
                                     component="div"
                                     sx={{ flexGrow: 1 }}
          >
            <Input
              onChange={handleChange}
              value={search}
              id="input-with-icon-adornment"
              autoFocus={true}
            />
            <Button onClick={handleSubmit}>
              <InputAdornment position="start">
                <SearchIcon className={css[`${theme?.theme}`]} />
              </InputAdornment>
            </Button>
          </Typography>}
          {!showSearch && <Button onClick={toggleSearch}>
            <SearchIcon className={css[`${theme?.theme}`]} />
          </Button>}
          <Button onClick={handleChangeTheme}>
                            <span className={css[`${theme?.theme}`]}>
                                {theme?.theme}
                            </span>
          </Button>
          <AccountCircleIcon />
        </Toolbar>
      </AppBar>

      {genre?.genres &&
        <Box>
          <List items={genre?.genres}
                renderItem={((item: IGenre) => <GenreItem key={item.id}
                                                          genre={item}
                />)}
          />
        </Box>
      }
    </Box>
  );
};

export { Header };
