# TMDB Movie Browser

A refactored educational Next.js project for browsing movies using the TMDB API.

The app includes movie discovery, search, genre filtering, movie detail pages, pagination, reusable UI components, and a cleaner App Router structure.

## Demo Purpose

This is a portfolio/demo project.
It is not a commercial movie platform.

Movie data and images are loaded from TMDB API. The project is built for educational and demonstration purposes.

## Features

* Movie list with pagination
* Movie search by title
* Movie details page
* Genre list
* Movies filtered by genre
* Custom recommendation list
* Poster image helper
* Rating display component
* Responsive layout
* Cleaned route structure
* Server-side data loading with Next.js App Router
* Environment-based API token usage

## Tech Stack

* Next.js 15
* React 18
* TypeScript
* CSS Modules
* React Hook Form
* TMDB API

## Project Structure

```txt
src/
  app/
    (movies-layout)/
      custom-recommend/
      genre-list/
      movies-home/
      movies-list/
      movies-search/
      layout.tsx
      movies-layout.module.css
    components/
    services/
    urls/
    globals.css
    layout.tsx
    page.tsx
```

## Main Routes

```txt
/                         → redirects to /movies-list
/movies-list              → movie list
/movies-list?page=2       → paginated movie list
/movies-list/[id]         → movie details
/movies-search            → movie search
/movies-search?query=...  → search results
/genre-list               → genre list
/genre-list/[id]?page=1   → movies by genre
/custom-recommend?page=1  → custom recommendation list
```

## Environment Variables

Create an `.env` or `.env.local` file in the project root:

```env
TMDB_API_TOKEN=your_tmdb_token_here
```

A safe example file is included:

```txt
.env.example
```

Do not commit real API tokens.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build the project:

```bash
npm run build
```

Start production mode:

```bash
npm run start
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This project was originally created as a learning project and then refactored to improve:

* folder structure
* route organization
* TypeScript safety
* reusable components
* UI consistency
* environment variable handling
* Git cleanup

## Status

Refactored educational portfolio project.
