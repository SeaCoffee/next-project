import React from 'react';
import MoviesList from "@/app/(movies-layout)/movies-list/page";

const MoviesListHomePage = async ({ params }: { params?: { page?: string } }): Promise<JSX.Element> => {
    const currentPage = Number(params?.page) || 1;
    return <MoviesList currentPage={currentPage} />;
};

export default MoviesListHomePage;
