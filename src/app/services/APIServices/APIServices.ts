import customFetchInterceptor from '@/app/services/APIServices/customFetchInterceptor';
import { imageUrlBuilder, urlBuilder } from '@/app/urls/urls';

export const movieService = {
  getAllMovies: (page: number = 1): Promise<IMovieResponse> => {
    return customFetchInterceptor<IMovieResponse>(
      urlBuilder.allMoviesUrl(page),
    );
  },

  getMovieById: (id: string | number): Promise<IMovie> => {
    return customFetchInterceptor<IMovie>(
      urlBuilder.movieByIdUrl(id),
    );
  },
};

export const genreService = {
  getGenres: (): Promise<IGenreResponse> => {
    return customFetchInterceptor<IGenreResponse>(
      urlBuilder.genresUrl(),
    );
  },

  getMoviesByGenre: (
    genreId: string | number,
    page: number = 1,
  ): Promise<IMovieResponse> => {
    return customFetchInterceptor<IMovieResponse>(
      urlBuilder.moviesByGenreUrl(genreId, page),
    );
  },
};

export const searchMovieService = {
  searchMovies: (
    query: string,
    page: number = 1,
  ): Promise<IMovieResponse> => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      throw new Error('Search query is required.');
    }

    return customFetchInterceptor<IMovieResponse>(
      urlBuilder.searchMoviesUrl(normalizedQuery, page),
    );
  },
};

export const customRecommendListService = {
  getCustomList: (page: number = 1): Promise<ICustomListResponse> => {
    return customFetchInterceptor<ICustomListResponse>(
      urlBuilder.customRecommendListUrl(page),
    );
  },

  getTvById: (id: string | number): Promise<ICustomMovie> => {
    return customFetchInterceptor<ICustomMovie>(
      urlBuilder.tvByIdUrl(id),
    );
  },
};

export const imageService = {
  getPosterUrl: (
    posterPath: string | null | undefined,
    size: string = 'w500',
  ): string => {
    return imageUrlBuilder.posterUrl(posterPath, size);
  },

  getBackdropUrl: (
    backdropPath: string | null | undefined,
    size: string = 'w1280',
  ): string => {
    return imageUrlBuilder.backdropUrl(backdropPath, size);
  },
};