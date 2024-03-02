const baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '82b205270d637f8e7c805273646956b7';
const movies = '/discover/movie';
const genres = '/genre/movie/list';
const moviesByGenre = `${movies}?with_genres=`;
const moviesBySearch = 'search/movie?query=';
const movieDetails = '/movie';

const defaultUrlImage = 'https://image.tmdb.org/t/p/w200/';

export {
  baseURL,
  API_KEY,
  movies,
  genres,
  moviesByGenre,
  moviesBySearch,
  movieDetails,
  defaultUrlImage,
};
