import PosterComponent from '@/app/components/PosterComponent/PosterComponent';
import StarsRatingComponent from '@/app/components/StarsRatingComponent/StarsRatingComponent';

import styles from './RecommendListComponent.module.css';

type FlexibleCustomMovie = ICustomMovie & {
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: string | number;
  rating?: string | number;
};

type Props = {
  movie: ICustomMovie;
};

const toNumber = (value: string | number | null | undefined): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const getTitle = (movie: FlexibleCustomMovie): string => {
  return movie.title || movie.name || 'Untitled';
};

const getReleaseDate = (movie: FlexibleCustomMovie): string | null => {
  return movie.release_date || movie.first_air_date || null;
};

const getRating = (movie: FlexibleCustomMovie): number | null => {
  return toNumber(movie.vote_average) ?? toNumber(movie.rating);
};

export default function RecommendListComponent({ movie }: Props) {
  const normalizedMovie = movie as FlexibleCustomMovie;

  const title = getTitle(normalizedMovie);
  const releaseDate = getReleaseDate(normalizedMovie);
  const rating = getRating(normalizedMovie);
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <article className={styles.card}>
      <div className={styles.posterWrap}>
        <PosterComponent
          url={normalizedMovie.poster_path}
          alt={title}
          className={styles.poster}
        />

        <div className={styles.posterOverlay}>
          <span className={styles.badge}>Recommended</span>
        </div>
      </div>

      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.meta}>
          {releaseYear && (
            <span className={styles.metaItem}>{releaseYear}</span>
          )}

          {rating !== null && (
            <span className={styles.metaItem}>★ {rating.toFixed(1)}</span>
          )}
        </div>

        {rating !== null ? (
          <StarsRatingComponent rating={rating} />
        ) : (
          <p className={styles.noRating}>No rating yet</p>
        )}
      </div>
    </article>
  );
}