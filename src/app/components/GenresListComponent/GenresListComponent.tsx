import Link from 'next/link';

import styles from './GenresList.module.css';

type Props = {
  genre: IGenre;
};

export default function MoviesGenreListComponent({ genre }: Props) {
  return (
    <Link
      href={`/genre-list/${genre.id}?page=1`}
      className={styles.genreCard}
    >
      <span className={styles.genreName}>{genre.name}</span>
      <span className={styles.genreArrow}>→</span>
    </Link>
  );
}