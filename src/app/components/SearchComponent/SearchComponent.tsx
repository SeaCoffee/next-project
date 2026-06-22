import { searchMovieService } from '@/app/services/APIServices/APIServices';

type SearchMoviesParams = {
  query: string;
  page?: number;
};

const SearchComponent = async ({
  query,
  page = 1,
}: SearchMoviesParams): Promise<IMovieResponse> => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    throw new Error('Search query is required.');
  }

  return searchMovieService.searchMovies(normalizedQuery, page);
};

export default SearchComponent;