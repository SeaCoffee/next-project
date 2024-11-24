import MoviesListComponent from "@/app/components/MoviesListComponent/MoviesListComponent";
import Link from "next/link";
import {genreService} from "@/app/services/APIServices/APIServices";
interface MoviesByGenrePaginationProps {
    params: {
        id: string;  // ID жанра
        page: string; // Номер страницы
    };
}

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
            <div className="pagination">
                {currentPage > 1 && (
                    <Link href={`/genre-list/${id}/page/${currentPage - 1}`}>
                        Previous
                    </Link>
                )}
                {currentPage < movies.total_pages && (
                    <Link href={`/genre-list/${id}/page/${currentPage + 1}`}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MoviesByGenrePaginationPage;