import Link from 'next/link';
import styles from './GenresList.module.css';

const MoviesGenreListComponent: React.FC<{ genre: IGenre }> = ({ genre }) => {
    return (
        <div className={styles.genreCard}>
            <Link
                href={{
                    pathname: `/genre-list/${genre.id}/page/1`,
                }}
                className={styles.genreLink}
            >
                {genre.name}
            </Link>
        </div>
    );
};

export default MoviesGenreListComponent;

