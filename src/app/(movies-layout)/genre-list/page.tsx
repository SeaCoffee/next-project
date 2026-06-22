import MoviesGenreListComponent from '@/app/components/GenresListComponent/GenresListComponent';
import { genreService } from '@/app/services/APIServices/APIServices';

import styles from './GenresList.module.css';

export default async function GenreListPage() {
  const allGenres = await genreService.getGenres();
  const genres = allGenres.genres ?? [];

  return (
    <section className={styles.genresContainer}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Browse by mood</p>
        <h1 className={styles.title}>Movie genres</h1>
        <p className={styles.description}>
          Choose a genre and discover movies grouped by category.
        </p>
      </div>

      {genres.length > 0 ? (
        <div className={styles.gridContainer}>
          {genres.map((genre) => (
            <MoviesGenreListComponent key={genre.id} genre={genre} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No genres found</h2>
          <p className={styles.emptyText}>
            Try reloading the page later.
          </p>
        </div>
      )}
    </section>
  );
}