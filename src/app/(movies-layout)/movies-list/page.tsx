import Link from 'next/link';

import MoviesListComponent from '@/app/components/MoviesListComponent/MoviesListComponent';
import { movieService } from '@/app/services/APIServices/APIServices';

import styles from './movies-list.module.css';

type MoviesListPageProps = {
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

const buildMoviesPageHref = (page: number): string => {
  return `/movies-list?page=${page}`;
};

export default async function MoviesListPage({
  searchParams,
}: MoviesListPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = getValidPage(resolvedSearchParams?.page);

  const movies = await movieService.getAllMovies(currentPage);
  const totalPages = movies.total_pages ?? 1;
  const results = movies.results ?? [];

  return (
    <section className={styles.listContainer}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Discover</p>
        <h1 className={styles.title}>Popular movies</h1>
        <p className={styles.description}>
          Browse movies from TMDB, open details and move through pages.
        </p>
      </div>

      <div className={styles.toolbar}>
        <span className={styles.pageInfo}>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <span className={styles.countInfo}>
          {results.length} movies on this page
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
            Try another page or reload the movie list.
          </p>
        </div>
      )}

      <nav className={styles.pagination} aria-label="Movies pagination">
        {currentPage > 1 ? (
          <Link
            href={buildMoviesPageHref(currentPage - 1)}
            className={styles.button}
          >
            Previous
          </Link>
        ) : (
          <span className={styles.disabledButton}>Previous</span>
        )}

        <span className={styles.currentPage}>
          {currentPage}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={buildMoviesPageHref(currentPage + 1)}
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