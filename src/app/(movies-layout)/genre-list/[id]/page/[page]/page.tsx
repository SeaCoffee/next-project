import Link from "next/link";

import MoviesListComponent from "@/app/components/MoviesListComponent/MoviesListComponent";
import {genreService} from "@/app/services/APIServices/APIServices";
import styles from './GenresList.module.css';



const MoviesByGenrePaginationPage = async ({ params }: MoviesByGenrePaginationProps): Promise<JSX.Element> => {
    const { id, page } = params;
    const currentPage = Number(page) || 1;


    const movies = await genreService.getMoviesByGenre(id, currentPage);

    return (
        <div>
            <h1>Movies in Genre {id} - Page {currentPage}</h1>
            {movies.results.map((movie: IMovie) => (
                <div key={movie.id}>
                    <MoviesListComponent movie={movie} />
                </div>
            ))}
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <Link href={`/genre-list/${id}/page/${currentPage - 1}`} className={styles.paginationButton}>
                        Previous
                    </Link>
                )}
                {currentPage < movies.total_pages && (
                    <Link href={`/genre-list/${id}/page/${currentPage + 1}`} className={styles.paginationButton}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MoviesByGenrePaginationPage;