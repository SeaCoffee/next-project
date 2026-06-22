export interface MoviesByGenrePageProps {
  params: {
    id: string;
    page?: string;
  };
}

export interface SearchComponentProps {
  query: string;
  page?: number;
}

export interface SearchFormInputs {
  query: string;
}

export interface SearchResultsProps {
  movies: IMovie[];
}

export interface CustomRecommendPaginationProps {
  params: {
    page: string;
  };
}

export interface MoviesByGenrePaginationProps {
  params: {
    id: string;
    page: string;
  };
}

export interface MoviesListCardPageProps {
  params: {
    id: string;
  };
  searchParams: {
    query?: string;
    page?: string;
  };
}

export interface MoviesListProps {
  currentPage: number;
}

export interface SearchMoviesFormProps {
  initialQuery?: string;
  initialPage?: number;
  movies?: IMovieResponse | null;
}

interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  rating?: number;
}

interface ICustomMovie {
  id: number;

  title?: string;
  name?: string;

  overview?: string;
  description?: string;

  poster_path?: string | null;
  backdrop_path?: string | null;

  release_date?: string;
  first_air_date?: string;

  vote_average?: number;
  rating?: number;

  media_type?: 'movie' | 'tv' | string;
}