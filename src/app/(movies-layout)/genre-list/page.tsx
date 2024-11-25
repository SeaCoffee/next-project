import {genreService} from "@/app/services/APIServices/APIServices";
import MoviesGenreListComponent from "@/app/components/GenresListComponent/GenresListComponent";

import styles from './GenresList.module.css';

const GenreListPage = async (): Promise<JSX.Element> => {
    const allGenres = await genreService.getGenres();

    return (
        <div className={styles.genresContainer}>
            <h1>Genres</h1>
            <div className={styles.gridContainer}>
                {allGenres.genres.map((genre: IGenre) => (
                    <MoviesGenreListComponent key={genre.id} genre={genre} />
                ))}
            </div>
        </div>
    );
};

export default GenreListPage;