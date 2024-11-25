'use client'


import { useForm } from 'react-hook-form';
import {useState, useEffect} from "react";
import Link from "next/link";

import SearchComponent from "@/app/components/SearchComponent/SearchComponent";

import styles from './SearchMoviesForm.module.css';


const SearchMoviesForm: React.FC<SearchMoviesFormProps> = ({ initialQuery = "", initialPage = 1 }) => {
    const { register, handleSubmit } = useForm<SearchFormInputs>();
    const [movies, setMovies] = useState<IMovieResponse | null>(null);
    const [query, setQuery] = useState<string>(initialQuery)
    const [currentPage, setCurrentPage] = useState<number>(initialPage);


    useEffect(() => {
        const savedMovies = localStorage.getItem('searchMovies');
        const savedQuery = localStorage.getItem('searchQuery');
        const savedPage = localStorage.getItem('searchPage');

        if (savedMovies && savedQuery && savedPage) {
            setMovies(JSON.parse(savedMovies));
            setQuery(savedQuery);
            setCurrentPage(Number(savedPage));
        }
    }, []);

    useEffect(() => {
        if (movies && query) {
            localStorage.setItem('searchMovies', JSON.stringify(movies));
            localStorage.setItem('searchQuery', query);
            localStorage.setItem('searchPage', currentPage.toString());
        }
    }, [movies, query, currentPage]);

    const fetchMovies = async (searchQuery: string, page: number) => {
        try {
            const response = await SearchComponent({ query: searchQuery, page });
            setMovies(response);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error during movie search:', error);
        }
    };

    const onSubmit = async (data: SearchFormInputs) => {
        setQuery(data.query);
        await fetchMovies(data.query, 1);
    };

    const handleNextPage = () => {
        if (movies && currentPage < movies.total_pages && query) {
            fetchMovies(query, currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1 && query) {
            fetchMovies(query, currentPage - 1);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    {...register('query', { required: true })}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    Search
                </button>
            </form>

            {movies && (
                <div className={styles.resultsContainer}>
                    {movies.results.map((movie) => (
                        <div key={movie.id} className={styles.resultCard}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className={styles.resultPoster}
                            />
                            <div className={styles.resultInfo}>
                                <h3 className={styles.resultTitle}>{movie.title}</h3>
                                <Link
                                    href={{
                                        pathname: `/movies-list/${movie.id}`,
                                        query: { query, page: currentPage },
                                    }}
                                    className={styles.resultLink}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                    <div className={styles.pagination}>
                        {currentPage > 1 && (
                            <button onClick={handlePreviousPage} className={styles.paginationButton}>
                                Previous
                            </button>
                        )}
                        {currentPage < movies.total_pages && (
                            <button onClick={handleNextPage} className={styles.paginationButton}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchMoviesForm;
