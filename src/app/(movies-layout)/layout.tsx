import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Movies App',
    description: 'Explore movies and genres in this application.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
