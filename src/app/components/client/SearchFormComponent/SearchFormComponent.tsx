'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { imageUrlBuilder } from '@/app/urls/urls';

import styles from './SearchMoviesForm.module.css';

type Props = {
  initialQuery?: string;
  initialPage?: number;
  movies?: IMovieResponse | null;
};

type FormInputs = {
  query: string;
};

const SEARCH_PAGE_PATH = '/movies-search';

const buildSearchHref = (query: string, page: number): string => {
  const params = new URLSearchParams();

  params.set('query', query.trim());
  params.set('page', String(page));

  return `${SEARCH_PAGE_PATH}?${params.toString()}`;
};

export default function SearchMoviesForm({
  initialQuery = '',
  initialPage = 1,
  movies = null,
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      query: initialQuery,
    },
  });

  const normalizedQuery = initialQuery.trim();
  const results = movies?.results ?? [];
  const totalPages = movies?.total_pages ?? 0;
  const hasResults = results.length > 0;
  const hasSearched = Boolean(normalizedQuery);
  const canGoPrevious = initialPage > 1;
  const canGoNext = totalPages > 0 && initialPage < totalPages;

  useEffect(() => {
    reset({
      query: initialQuery,
    });
  }, [initialQuery, reset]);

  const onSubmit = ({ query }: FormInputs) => {
    const normalizedValue = query.trim();

    if (!normalizedValue) {
      return;
    }

    router.push(buildSearchHref(normalizedValue, 1));
  };

  return (
    <section className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <p className={styles.eyebrow}>Movie database</p>
        <h1 className={styles.title}>Search movies</h1>
        <p className={styles.description}>
          Find movies by title and open details with poster, rating and overview.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
        <div className={styles.inputGroup}>
          <input
            type="search"
            placeholder="Search for a movie..."
            autoComplete="off"
            className={styles.searchInput}
            {...register('query', {
              required: 'Enter a movie title.',
              setValueAs: (value: string) => value.trimStart(),
            })}
          />

          {errors.query?.message && (
            <p className={styles.errorText}>{errors.query.message}</p>
          )}
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {hasSearched && (
        <div className={styles.resultsMeta}>
          <span>
            Results for <strong>{normalizedQuery}</strong>
          </span>

          {totalPages > 0 && (
            <span>
              Page {initialPage} of {totalPages}
            </span>
          )}
        </div>
      )}

      {hasSearched && !hasResults && (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No movies found</h2>
          <p className={styles.emptyText}>
            Try another title or check the spelling.
          </p>
        </div>
      )}

      {hasResults && (
        <div className={styles.resultsGrid}>
          {results.map((movie) => (
            <article key={movie.id} className={styles.resultCard}>
              <Link
                href={{
                  pathname: `/movies-list/${movie.id}`,
                  query: {
                    query: normalizedQuery,
                    page: initialPage,
                  },
                }}
                className={styles.posterLink}
                aria-label={`Open details for ${movie.title}`}
              >
                <img
                  src={imageUrlBuilder.posterUrl(movie.poster_path, 'w342')}
                  alt={movie.title}
                  className={styles.resultPoster}
                />
              </Link>

              <div className={styles.resultInfo}>
                <div className={styles.resultContent}>
                  <h2 className={styles.resultTitle}>{movie.title}</h2>

                  {movie.release_date && (
                    <p className={styles.resultDate}>
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}

                  {typeof movie.vote_average === 'number' && (
                    <p className={styles.rating}>
                      ★ {movie.vote_average.toFixed(1)}
                    </p>
                  )}
                </div>

                <Link
                  href={{
                    pathname: `/movies-list/${movie.id}`,
                    query: {
                      query: normalizedQuery,
                      page: initialPage,
                    },
                  }}
                  className={styles.resultLink}
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {hasResults && (
        <nav className={styles.pagination} aria-label="Search pagination">
          {canGoPrevious ? (
            <Link
              href={buildSearchHref(normalizedQuery, initialPage - 1)}
              className={styles.paginationButton}
            >
              Previous
            </Link>
          ) : (
            <span className={styles.paginationButtonDisabled}>Previous</span>
          )}

          <span className={styles.paginationCurrent}>
            {initialPage}
          </span>

          {canGoNext ? (
            <Link
              href={buildSearchHref(normalizedQuery, initialPage + 1)}
              className={styles.paginationButton}
            >
              Next
            </Link>
          ) : (
            <span className={styles.paginationButtonDisabled}>Next</span>
          )}
        </nav>
      )}
    </section>
  );
}