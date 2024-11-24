import SearchMoviesForm from "@/app/components/client/SearchFormComponent/SearchFormComponent";

const SearchPage = ({ searchParams }: { searchParams: { query?: string; page?: string } }) => {
    const query = searchParams.query || "";
    const currentPage = parseInt(searchParams.page || "1", 10);

    return (
        <div>
            <h1>Search Movies</h1>
            <SearchMoviesForm initialQuery={query} initialPage={currentPage} />
        </div>
    );
};

export default SearchPage;