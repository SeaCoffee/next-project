import React, {FC} from "react";
import Link from "next/link";
import PosterComponent from "@/app/components/PosterComponent/PosterComponent";
import styles from './RecommendListComponent.module.css';


export const RecommendListComponent: FC<{ movie: ICustomMovie }> = ({ movie }) => {
    const title = movie.name || 'Unnamed Movie';
    console.log('Recommendation:', title);
    console.log('Movie Data:', movie);


    return (
        <div className={styles.card}>

            <PosterComponent
                url={movie.poster_path}
                alt={movie.name || 'Movie poster'}
            />


            <div className={styles.info}>
                <h3 className={styles.title}>{movie.name || 'Unnamed Movie'}</h3>
                <p>
                    <strong>Rating:</strong> {movie.rating || 'N/A'}
                </p>
                <p>
                    <strong>Release Date:</strong> {movie.release_date || 'Unknown'}
                </p>
                <Link href={`/custom-recommend/${movie.id}`}>View Details</Link>
                {movie.name || 'Unnamed Movie'}

            </div>
        </div>
    );
};
export default RecommendListComponent;



