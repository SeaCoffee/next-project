export const baseUrl: string = 'https://api.themoviedb.org/3';

export const basePosterUrl = 'https://image.tmdb.org/t/p/';


export const urlBuilder = {
    allMoviesUrl: (page: number = 1): string =>
        `${baseUrl}/discover/movie?page=${page}`,
    movieByIdUrl: (id: string | number): string =>
        `${baseUrl}/movie/${id}`,
    genresUrl: (): string => `${baseUrl}/genre/movie/list`,
    moviesByGenreUrl: (genreId: string | number, page: number = 1): string =>
        `${baseUrl}/discover/movie?with_genres=${genreId}&page=${page}`,
    searchMoviesUrl: (query: string, page: number = 1): string =>
        `${baseUrl}/search/movie?query=${query}&page=${page}`,
    customRecommendListUrl: (page: number = 1): string =>
        `${baseUrl}/list/8497880?page=${page}`,
    tvByIdUrl: (id: string | number) =>
        `/tv/${id}`,
};
