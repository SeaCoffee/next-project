import React from 'react';
import Link from "next/link";

import {movieService} from "@/app/services/APIServices/APIServices";
import MoviesListComponent from "@/app/components/MoviesListComponent/MoviesListComponent";

import styles from './movies-list.module.css';



const MoviesList = async ({ currentPage }: MoviesListProps): Promise<JSX.Element> => {
    try {
        const allMovies = await movieService.getAllMovies(currentPage);

        return (
            <div className={styles.listContainer}>
                <h1 className={styles.title}>Movies - Page {currentPage}</h1>
                <div className={styles.grid}>
                    {allMovies.results.map((movie: IMovie) => (
                        <MoviesListComponent key={movie.id} movie={movie} />
                    ))}
                </div>
                <div className={styles.pagination}>
                    {currentPage > 1 && (
                        <Link href={`/movies-list/page/${currentPage - 1}`} className={styles.button}>
                            Previous
                        </Link>
                    )}
                    {currentPage < allMovies.total_pages && (
                        <Link href={`/movies-list/page/${currentPage + 1}`} className={styles.button}>
                            Next
                        </Link>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading movies:', error);
        return <div>Failed to load movies</div>;
    }
};

export default MoviesList;


