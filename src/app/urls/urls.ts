export const tmdbApiBaseUrl = 'https://api.themoviedb.org/3';
export const tmdbImageBaseUrl = 'https://image.tmdb.org/t/p';

type IdParam = string | number;
type PageParam = number;

type TmdbQueryParams = Record<string, string | number | boolean | null | undefined>;

const buildTmdbUrl = (path: string, params: TmdbQueryParams = {}): string => {
  const url = new URL(`${tmdbApiBaseUrl}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

export const urlBuilder = {
  allMoviesUrl: (page: PageParam = 1): string =>
    buildTmdbUrl('/discover/movie', { page }),

  movieByIdUrl: (id: IdParam): string =>
    buildTmdbUrl(`/movie/${id}`),

  genresUrl: (): string =>
    buildTmdbUrl('/genre/movie/list'),

  moviesByGenreUrl: (genreId: IdParam, page: PageParam = 1): string =>
    buildTmdbUrl('/discover/movie', {
      with_genres: genreId,
      page,
    }),

  searchMoviesUrl: (query: string, page: PageParam = 1): string =>
    buildTmdbUrl('/search/movie', {
      query: query.trim(),
      page,
    }),

  customRecommendListUrl: (page: PageParam = 1): string =>
    buildTmdbUrl('/list/8497880', { page }),

  tvByIdUrl: (id: IdParam): string =>
    buildTmdbUrl(`/tv/${id}`),
};

export const imageUrlBuilder = {
  posterUrl: (posterPath: string | null | undefined, size = 'w500'): string => {
    if (!posterPath) {
      return '/placeholder.jpg';
    }

    return `${tmdbImageBaseUrl}/${size}${posterPath}`;
  },

  backdropUrl: (backdropPath: string | null | undefined, size = 'w1280'): string => {
    if (!backdropPath) {
      return '/placeholder.jpg';
    }

    return `${tmdbImageBaseUrl}/${size}${backdropPath}`;
  },
};