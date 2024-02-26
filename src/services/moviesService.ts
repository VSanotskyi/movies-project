import { apiService } from './apiService';
import { typeRes } from '../types';
import { IGenres, IMoviesRes } from '../interfaces';
import { IDetails } from '../interfaces/detailsInterface';
import { genres, movies, moviesByGenre, moviesBySearch, movieDetails } from '../constants/urls';

const getAll = (page: number): typeRes<IMoviesRes> => {
  return apiService.get(movies + `?page=${page}`);
};
const getByGenre = (id: string, page: number): typeRes<IMoviesRes> => {
  return apiService.get(`${moviesByGenre}${id}&page=${page}`);
};

const getAllGenres = (): typeRes<IGenres> => {
  return apiService.get(genres);
};

const getSearchMovies = (search: string, page: number): typeRes<IMoviesRes> => {
  return apiService.get(`${moviesBySearch}${search}&page=${page}`);
};

const getDetailsMovie = (id: string): typeRes<IDetails> => {
  return apiService.get(`${movieDetails}/${id}`);
};

export const api = {
  getAll,
  getByGenre,
  getAllGenres,
  getSearchMovies,
  getDetailsMovie,
};
