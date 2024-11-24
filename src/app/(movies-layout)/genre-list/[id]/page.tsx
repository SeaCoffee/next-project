import {genreService} from "@/app/services/APIServices/APIServices";
import Link from "next/link";

import MoviesListComponent from "@/app/components/MoviesListComponent/MoviesListComponent";


import styles from './GenresList.module.css';

const MoviesByGenreFirstPage = async ({ params }: MoviesByGenrePageProps): Promise<JSX.Element> => {
    const { id } = params;
    const currentPage = 1;

    const movies = await genreService.getMoviesByGenre(id, currentPage);

    return (
        <div className={styles.genresContainer}>
            <h1>Movies in Genre {id} - Page {currentPage}</h1>
            <div className={styles.gridContainer}>
                {movies.results.map((movie: IMovie) => (
                    <MoviesListComponent key={movie.id} movie={movie} />
                ))}
            </div>
            <div className={styles.pagination}>
                {movies.total_pages > 1 && (
                    <Link href={`/genre-list/${id}/page/${currentPage + 1}`} className={styles.paginationButton}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MoviesByGenreFirstPage;