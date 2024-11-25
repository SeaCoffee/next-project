import React from 'react';


export const metadata = {
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
