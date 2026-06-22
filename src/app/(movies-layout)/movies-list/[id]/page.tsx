import Link from 'next/link';
import { notFound } from 'next/navigation';

import PosterComponent from '@/app/components/PosterComponent/PosterComponent';
import StarsRatingComponent from '@/app/components/StarsRatingComponent/StarsRatingComponent';
import { movieService } from '@/app/services/APIServices/APIServices';

import styles from './MoviesListCardPage.module.css';

type MovieDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

const formatMoney = (value?: number | null): string => {
  if (!value) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const getRating = (movie: IMovie): number | null => {
  if (typeof movie.vote_average === 'number') {
    return movie.vote_average;
  }

  if (typeof movie.rating === 'number') {
    return movie.rating;
  }

  return null;
};

const buildBackHref = (query?: string, page?: string): string => {
  if (query) {
    const params = new URLSearchParams();

    params.set('query', query);
    params.set('page', page || '1');

    return `/movies-search?${params.toString()}`;
  }

  return '/movies-list';
};

export default async function MovieDetailsPage({
  params,
  searchParams,
}: MovieDetailsPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.query?.trim() ?? '';
  const page = resolvedSearchParams?.page ?? '1';

  let movie: IMovie;

  try {
    movie = await movieService.getMovieById(id);
  } catch {
    notFound();
  }

  const rating = getRating(movie);
  const overview = movie.description || movie.overview || 'No description available.';
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <section className={styles.page}>
      <Link href={buildBackHref(query, page)} className={styles.backLink}>
        ← {query ? 'Back to search results' : 'Back to movies'}
      </Link>

      <article className={styles.hero}>
        <div className={styles.posterPanel}>
          <PosterComponent
            url={movie.poster_path}
            alt={movie.title || 'Movie poster'}
            className={styles.poster}
            priority
          />
        </div>

        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <p className={styles.eyebrow}>Movie details</p>

            <h1 className={styles.title}>
              {movie.title || 'Untitled movie'}
            </h1>

            <div className={styles.meta}>
              {releaseYear && (
                <span className={styles.metaItem}>{releaseYear}</span>
              )}

              {rating !== null && (
                <span className={styles.metaItem}>
                  ★ {rating.toFixed(1)}
                </span>
              )}

              <span className={styles.metaItem}>
                ID: {movie.id}
              </span>
            </div>
          </div>

          {rating !== null && (
            <div className={styles.ratingPanel}>
              <span className={styles.ratingLabel}>User score</span>
              <StarsRatingComponent rating={rating} />
            </div>
          )}

          <div className={styles.overviewBlock}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.overview}>{overview}</p>
          </div>

          <dl className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <dt>Budget</dt>
              <dd>{formatMoney(movie.budget)}</dd>
            </div>

            <div className={styles.detailItem}>
              <dt>Release date</dt>
              <dd>{movie.release_date || 'Unknown'}</dd>
            </div>
          </dl>

          {movie.genres && movie.genres.length > 0 && (
            <div className={styles.genresBlock}>
              <h2 className={styles.sectionTitle}>Genres</h2>

              <div className={styles.genresList}>
                {movie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/genre-list/${genre.id}?page=1`}
                    className={styles.genreBadge}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}