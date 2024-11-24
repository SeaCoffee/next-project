import React from 'react';
import Link from "next/link";

import styles from './MoviesListComponent.module.css';
import PosterComponent from "@/app/components/PosterComponent/PosterComponent";

const MoviesListComponent: React.FC<{ movie: IMovie }> = ({ movie }) => {
    return (
        <div className={styles.card}>
            <PosterComponent
                url={movie.poster_path}
                alt={movie.title || 'Movie poster'}
            />
            <div className={styles.info}>
                <h3 className={styles.title}>{movie.title}</h3>
                <p className={styles.details}>
                    <strong>Rating:</strong> {movie.rating || 'N/A'}
                </p>
                <p className={styles.details}>
                    <strong>Release Date:</strong> {movie.release_date || 'Unknown'}
                </p>
                <Link href={`/movies-list/${movie.id}`} className={styles.link}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default MoviesListComponent;
