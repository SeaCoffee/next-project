import Link from "next/link";

const SearchResults: React.FC<SearchResultsProps> = ({ movies }) => {
    if (movies.length === 0) {
        return <p>No movies found</p>;
    }

    return (
        <div>
            <h2>Search Results:</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Link
                            href={{
                                pathname: `/movies-list/${movie.id}`,
                            }}
                        >
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;