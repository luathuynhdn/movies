/** Movie model in list */
export interface MovieModel {
  /** Whether the movie is intended for adults */
  adult: boolean;

  /** Path to the backdrop image */
  backdrop_path: string | null;

  /** List of genre IDs */
  genre_ids: number[];

  /** Unique movie ID */
  id: number;

  /** Original language code (ISO 639-1) */
  original_language: string;

  /** Original (untranslated) title */
  original_title: string;

  /** Overview or synopsis of the movie */
  overview: string;

  /** Popularity score (from TMDB API) */
  popularity: number;

  /** Path to the poster image */
  poster_path: string | null;

  /** Movie release date (ISO 8601 format) */
  release_date: string;

  /** Display title */
  title: string;

  /** Whether this movie has a video attached */
  video: boolean;

  /** Average user rating (0–10) */
  vote_average: number;

  /** Number of user votes */
  vote_count: number;
}

export interface MovieSearchParams {
  query?: string;
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
  language?: string;
  page?: number;
  region?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetailsModel extends MovieModel {
  belongs_to_collection?: unknown | null;
  budget?: number;
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue?: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status?: string;
  tagline?: string;
}
