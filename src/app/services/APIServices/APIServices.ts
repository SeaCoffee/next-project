import {basePosterUrl, urlBuilder} from "@/app/urls/urls";
import customFetchInterceptor from "@/app/services/APIServices/customFetchInterceptor";



export const movieService = {

        getAllMovies: async (page: number = 1): Promise<IMovieResponse> => {
            const url = urlBuilder.allMoviesUrl(page);
            console.log('Fetching movies from:', url);

            const response = await customFetchInterceptor<IMovieResponse>(url);
            return response;
        },

    getMovieById: async (id: string | number): Promise<IMovie> => {
        try {
            const movie = await customFetchInterceptor<IMovie>(
                urlBuilder.movieByIdUrl(id)
            );
            return movie;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw new Error('Failed to fetch movie');
        }
    },
};



export const genreService = {
    getGenres: async (): Promise<IGenreResponse> => {
        const genres = await customFetchInterceptor<IGenreResponse>(
            urlBuilder.genresUrl()
        );
        console.log(genres);
        return genres;
    },
    getMoviesByGenre: async (
        genreId: string | number,
        page: number = 1
    ): Promise<IMovieResponse> => {
        const movies = await customFetchInterceptor<IMovieResponse>(
            urlBuilder.moviesByGenreUrl(genreId, page)
        );
        console.log(movies);
        return movies;
    },
};



export const searchMovieService = {
    searchMovies: async (query: string, page: number = 1): Promise<IMovieResponse> => {
        if (!query.trim()) throw new Error('Query string is required');

        const response = await customFetchInterceptor<IMovieResponse>(
            urlBuilder.searchMoviesUrl(query, page)
        );
        console.log(response);
        return response;
    },
};


export const customRecommendListService = {
    // Получить список рекомендованных сериалов
    getCustomList: async (page: number = 1): Promise<ICustomListResponse> => {
        try {
            const customList = await customFetchInterceptor<ICustomListResponse>(
                urlBuilder.customRecommendListUrl(page)
            );
            console.log('Custom Recommend List:', customList);
            return customList;
        } catch (error) {
            console.error('Error fetching custom recommend list:', error);
            throw new Error('Failed to fetch custom recommend list');
        }
    },


    getTvById: async (id: string | number): Promise<ICustomMovie> => {
        try {
            const tvDetails = await customFetchInterceptor<ICustomMovie>(
                urlBuilder.tvByIdUrl(id)
            );
            console.log('TV Details:', tvDetails);
            return tvDetails;
        } catch (error) {
            console.error('Error fetching TV details:', error);
            throw new Error('Failed to fetch TV details');
        }
    },
};

export const imageService = {
    getPosterUrl: (posterPath: string | null, size: string = 'w500'): string => {
        if (!posterPath) {
            return '/placeholder.jpg';
        }
        return `${basePosterUrl}${size}${posterPath}`;
    },
};


