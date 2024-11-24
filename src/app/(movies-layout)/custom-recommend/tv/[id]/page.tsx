import {movieService} from "@/app/services/APIServices/APIServices";
import React from "react";
import PosterComponent from "@/app/components/PosterComponent/PosterComponent";
import StarsRatingComponent from "@/app/components/StarsRatingComponent/StarsRatingComponent";

interface RecommendListCardPageProps {
    params: { id: string };
}

const RecommendListCardPage = async (props: RecommendListCardPageProps): Promise<JSX.Element> => {
    const params = await props.params;
    console.log("Route Params Resolved:", params);
    // Делаем params асинхронным
    const { id } = await params;

    console.log("RecommendListCardPage loaded");
    console.log("Route Params:", params);

    let movie: IMovie | null = null;

    try {
        movie = await movieService.getMovieById(id);
    } catch (error) {
        console.error('Error fetching movie:', error);
    }

    if (!movie) {
        return <div className="not-found">Movie not found</div>;
    }

    return (
        <div className="container">
            <h1>{movie.title}</h1>
            <PosterComponent url={movie.poster_path} alt={movie.title} />
            <div className="details">
                <p>
                    <strong>ID:</strong> {movie.id}
                </p>
                <p>
                    <strong>Budget:</strong> {movie.budget ? `$${movie.budget}` : 'N/A'}
                </p>
                <p>
                    <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                    <strong>Description:</strong> {movie.description || movie.overview}
                </p>
            </div>
            <div className="rating-container">
                <strong>Rating:</strong>
                <StarsRatingComponent rating={(movie.vote_average || 0) / 2} />
                <span>{`(${movie.vote_average || 'N/A'})`}</span>
            </div>
        </div>
    );
};

export default RecommendListCardPage;
