import React, { ChangeEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment } from '@mui/material';

import { Context } from '../../hoc/ContextProvider';
import { ThemeContext } from '../../hoc/ThemProvider';
import { IGenre } from '../../interfaces';
import List from '../List/List';
import GenreItem from '../Genre/GenreItem';

import css from './Header.module.css';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const context = useContext(Context);
  const themeContext = useContext(ThemeContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search.length < 1) return;
    navigate(`/movies-project/movies/search/${search}`);
    setShowSearch(prev => !prev);
    setSearch('');
  };

  const handleChangeTheme = () => {
    themeContext?.toggleTheme();
  };

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
            >
              <Link className={css[`${themeContext?.theme}`]}
                    to={'movies'}
              >Movies</Link>
            </Typography>
            {showSearch && <Typography variant="h6"
                                       component="div"
                                       sx={{ flexGrow: 1 }}
            >
              <Input className={css[`${themeContext?.theme}`]}
                     onChange={handleChange}
                     value={search}
                     id="input-with-icon-adornment"
              />
              <Button onClick={handleSubmit}>
                <InputAdornment position="start">
                  <SearchIcon className={css[`${themeContext?.theme}`]} />
                </InputAdornment>
              </Button>
            </Typography>}
            {!showSearch && <Button onClick={toggleSearch}>
              <SearchIcon className={css[`${themeContext?.theme}`]} />
            </Button>}
            <Button onClick={handleChangeTheme}>
                            <span className={css[`${themeContext?.theme}`]}>
                                {themeContext?.theme}
                            </span>
            </Button>
            <AccountCircleIcon />
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        {context?.genres &&
          <List items={context?.genres}
                renderItem={((item: IGenre) => <GenreItem key={item.id}
                                                          genre={item}
                />)}
          />}
      </div>
    </div>
  );
};

export default Header;
