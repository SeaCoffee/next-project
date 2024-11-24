import React from 'react';
import {movieService} from "@/app/services/APIServices/APIServices";
import Link from "next/link";
import PosterComponent from "@/app/components/PosterComponent/PosterComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MoviesListCardPage.module.css';
import StarsRatingComponent from "@/app/components/StarsRatingComponent/StarsRatingComponent";
import { Badge } from 'reactstrap';

interface MoviesListCardPageProps {
    params: { id: string }; // Параметры маршрута
    searchParams: { query?: string; page?: string }; // Параметры строки запроса
}



const MoviesListCardPage = async ({ params, searchParams }: MoviesListCardPageProps): Promise<JSX.Element> => {
    const { id } = params;
    const query = searchParams?.query || '';
    const page = searchParams?.page || '1';
    console.log("RecommendListCardPage loaded for ID:", params.id);


    let movie: IMovie | null = null;

    try {
        movie = await movieService.getMovieById(id);
    } catch (error) {
        console.error('Error fetching movie:', error);
    }

    if (!movie) {
        return <div className={styles.notFound}>Movie not found</div>;
    }



    return (
        <div className={styles.container}>
            {/* Заголовок */}
            <h1 className={styles.title}>{movie.title}</h1>

            {/* Постер */}
            <PosterComponent url={movie.poster_path} alt={movie.title} />


            {/* Основная информация */}
            <div className={styles.details}>
                <p className={styles.text}>
                    <strong>ID:</strong> {movie.id}
                </p>
                <p className={styles.text}>
                    <strong>Budget:</strong> {movie.budget ? `$${movie.budget}` : 'N/A'}
                </p>
                <p className={styles.text}>
                    <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className={styles.text}>
                    <strong>Description:</strong> {movie.description || movie.overview}
                </p>
            </div>

            <div className={styles.ratingContainer}>
                <strong>Rating:</strong>
                <StarsRatingComponent rating={(movie.rating || movie.vote_average || 0) / 2} />
                <span className={styles.text}>{`(${movie.rating || movie.vote_average || 'N/A'})`}</span>
            </div>


            {/* Жанры с бейджами */}
            <div className={styles.genresContainer}>
                <strong>Genres:</strong>
                {movie.genres?.map((genre) => (
                    <Link key={genre.id} href={`/genre-list/${genre.id}/page/1`}>

                            <Badge color="primary" className={styles.genreBadge}>
                                {genre.name}
                            </Badge>

                    </Link>
                ))}
            </div>

            {/* Кнопка возврата */}
            {query && page && (
                <Link href={`/movies-search?query=${query}&page=${page}`}>

                        <button className={styles.backButton}>Back to Results</button>

                </Link>
            )}
        </div>
    );
};

export default MoviesListCardPage;
