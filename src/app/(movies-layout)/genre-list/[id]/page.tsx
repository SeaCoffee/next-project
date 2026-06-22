import Link from 'next/link';

import MoviesListComponent from '@/app/components/MoviesListComponent/MoviesListComponent';
import { genreService } from '@/app/services/APIServices/APIServices';

import styles from './GenreMoviesPage.module.css';

type GenreMoviesPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
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

const buildGenrePageHref = (genreId: string, page: number): string => {
  return `/genre-list/${genreId}?page=${page}`;
};

export default async function GenreMoviesPage({
  params,
  searchParams,
}: GenreMoviesPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = getValidPage(resolvedSearchParams?.page);
  const movies = await genreService.getMoviesByGenre(id, currentPage);

  const results = movies.results ?? [];
  const totalPages = movies.total_pages ?? 1;

  return (
    <section className={styles.listContainer}>
      <Link href="/genre-list" className={styles.backLink}>
        ← All genres
      </Link>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Genre collection</p>
        <h1 className={styles.title}>Genre #{id}</h1>
        <p className={styles.description}>
          Movies from this TMDB genre. Browse the list and open details.
        </p>
      </div>

      <div className={styles.toolbar}>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <span>
          {results.length} movies
        </span>
      </div>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((movie) => (
            <MoviesListComponent key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No movies found</h2>
          <p className={styles.emptyText}>
            Try another page or choose another genre.
          </p>
        </div>
      )}

      <nav className={styles.pagination} aria-label="Genre movies pagination">
        {currentPage > 1 ? (
          <Link
            href={buildGenrePageHref(id, currentPage - 1)}
            className={styles.button}
          >
            Previous
          </Link>
        ) : (
          <span className={styles.disabledButton}>Previous</span>
        )}

        <span className={styles.currentPage}>{currentPage}</span>

        {currentPage < totalPages ? (
          <Link
            href={buildGenrePageHref(id, currentPage + 1)}
            className={styles.button}
          >
            Next
          </Link>
        ) : (
          <span className={styles.disabledButton}>Next</span>
        )}
      </nav>
    </section>
  );
}