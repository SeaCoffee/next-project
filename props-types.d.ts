interface MoviesByGenrePageProps {
    params: { id: string; page?: string };
}

interface SearchComponentProps {
    query: string;
    page?: number;
}

interface SearchFormInputs {
    query: string;
}


interface SearchResultsProps {
    movies: IMovie[];
}

interface CustomRecommendPaginationProps {
    params: {
        page: string;
    };
}

interface MoviesByGenrePaginationProps {
    params: {
        id: string;
        page: string;
    };
}

interface MoviesListCardPageProps {
    params: { id: string };
    searchParams: { query?: string; page?: string };
}

interface MoviesListProps {
    currentPage: number;
}

interface SearchMoviesFormProps {
    initialQuery?: string;
    initialPage?: number;
}
