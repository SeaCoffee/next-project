import SearchMoviesForm from '@/app/components/client/SearchFormComponent/SearchFormComponent';
import { searchMovieService } from '@/app/services/APIServices/APIServices';

type SearchPageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

const getValidPage = (value?: string): number => {
  const page = Number(value);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.query?.trim() ?? '';
  const currentPage = getValidPage(resolvedSearchParams?.page);

  const movies = query
    ? await searchMovieService.searchMovies(query, currentPage)
    : null;

  return (
    <SearchMoviesForm
      initialQuery={query}
      initialPage={currentPage}
      movies={movies}
    />
  );
}