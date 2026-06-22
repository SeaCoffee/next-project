import Link from 'next/link';

import PosterComponent from '@/app/components/PosterComponent/PosterComponent';
import StarsRatingComponent from '@/app/components/StarsRatingComponent/StarsRatingComponent';

import styles from './MoviesListComponent.module.css';

type Props = {
  movie: IMovie;
};

const getMovieRating = (movie: IMovie): number | null => {
  if (typeof movie.vote_average === 'number') {
    return movie.vote_average;
  }

  if (typeof movie.rating === 'number') {
    return movie.rating;
  }

  return null;
};

export default function MoviesListComponent({ movie }: Props) {
  const rating = getMovieRating(movie);
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <article className={styles.card}>
      <Link
        href={`/movies-list/${movie.id}`}
        className={styles.posterLink}
        aria-label={`Open details for ${movie.title}`}
      >
        <PosterComponent
          url={movie.poster_path}
          alt={movie.title || 'Movie poster'}
          className={styles.poster}
        />
      </Link>

      <div className={styles.info}>
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title || 'Untitled movie'}</h2>

          <div className={styles.meta}>
            {releaseYear && (
              <span className={styles.metaItem}>{releaseYear}</span>
            )}

            {rating !== null && (
              <span className={styles.metaItem}>
                ★ {rating.toFixed(1)}
              </span>
            )}
          </div>

          {rating !== null ? (
            <StarsRatingComponent rating={rating} />
          ) : (
            <p className={styles.noRating}>No rating yet</p>
          )}
        </div>

        <Link href={`/movies-list/${movie.id}`} className={styles.link}>
          View details
        </Link>
      </div>
    </article>
  );
}