import MoviesList from "@/app/(movies-layout)/movies-list/page";
import React from "react";




const MoviesListPage = async ({ params }: { params: { page: string } }): Promise<JSX.Element> => {
    const currentPage: number = Number(params.page) || 1;

    return <MoviesList currentPage={currentPage} />;
};

export default MoviesListPage;
