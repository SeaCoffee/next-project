import Link from 'next/link';

import { imageUrlBuilder } from '@/app/urls/urls';

import styles from './SearchResults.module.css';

type Props = {
  movies: IMovie[];
  query?: string;
  page?: number;
};

export default function SearchResults({
  movies,
  query = '',
  page = 1,
}: Props) {
  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No movies found</h2>
        <p className={styles.emptyText}>
          Try another title or check the spelling.
        </p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Search results</h2>

        {query && (
          <p className={styles.subtitle}>
            Results for <strong>{query}</strong>
          </p>
        )}
      </div>

      <div className={styles.grid}>
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movies-list/${movie.id}`,
              query: {
                query,
                page,
              },
            }}
            className={styles.card}
          >
            <img
              src={imageUrlBuilder.posterUrl(movie.poster_path, 'w342')}
              alt={movie.title || 'Movie poster'}
              className={styles.poster}
            />

            <div className={styles.info}>
              <h3 className={styles.movieTitle}>
                {movie.title || 'Untitled movie'}
              </h3>

              {movie.release_date && (
                <p className={styles.date}>
                  {new Date(movie.release_date).getFullYear()}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}