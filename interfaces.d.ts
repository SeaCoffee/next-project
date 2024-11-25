

interface IMovie {
    id: number | string;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    genre_ids: number[];
    genres: { id: number; name: string }[];
    adult: boolean;
    original_language: string;
    description: string;
    rating?: number;
    vote_average?: number;
    budget: number;
}




interface IMovieResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}


interface IGenre {
    id: number | string;
    name: string;
}

interface IGenreResponse {
    genres: IGenre[];
}

interface ICustomListResponse {
    name: string;
    created_by: string;
    description: string;
    item_count: number;
    items: ICustomMovie[];
    total_pages: number;
    total_results: number;
}
interface ICustomMovie {
    id: number | string;
    name: string;
    backdrop_path?: string;
    original_name?: string;
    poster_path?: string;
    rating?: number | string;
    release_date?: string;
}







