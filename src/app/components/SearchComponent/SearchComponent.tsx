import {searchMovieService} from "@/app/services/APIServices/APIServices";


const SearchComponent = async ({ query, page = 1 }: SearchComponentProps): Promise<IMovieResponse> => {
    try {
        const movies = await searchMovieService.searchMovies(query, page);
        return movies;
    } catch (error) {
        console.error('Error during server-side movie search:', error);
        throw new Error('Failed to fetch movies');
    }
};

export default SearchComponent;