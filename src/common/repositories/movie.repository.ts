import httpClient from "@httpClient";

import type {
  MovieDetailsModel,
  MovieModel,
  MovieSearchParams,
} from "@models/movie.model";
import { API_LANG } from "@constants/common.constant";
import { MovieCategory } from "@constants/movie.constant";
import type { PaginationModel } from "@models/common.model";

const BASE_PATH = "/movie";

export const getMovies = async (category: string, page: number) => {
  let path = MovieCategory.NOW_PLAYING;
  if (category === MovieCategory.TOP_RATED) {
    path = MovieCategory.TOP_RATED;
  }

  const res = await httpClient.get<PaginationModel<MovieModel>>(
    `${BASE_PATH}/${path}?language=${API_LANG}&page=${page}`
  );
  return res?.data;
};

export const getMoviesBySearchCondition = async (params: MovieSearchParams) => {
  const res = await httpClient.get<PaginationModel<MovieModel>>(
    `search/${BASE_PATH}`,
    {
      params,
    }
  );
  return res?.data;
};

export const getMovieDetails = async (movieId: number, language = API_LANG) => {
  const res = await httpClient.get<MovieDetailsModel>(
    `${BASE_PATH}/${movieId}?language=${language}`
  );
  return res?.data;
};
