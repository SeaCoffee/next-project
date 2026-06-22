import Link from 'next/link';

import RecommendListComponent from '@/app/components/RecommendListComponent/RecommendListComponent';
import { customRecommendListService } from '@/app/services/APIServices/APIServices';

import styles from './RecommendList.module.css';

type CustomRecommendListPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const getValidPage = (value?: string): number => {
  const page = Number(value);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
};

const buildRecommendPageHref = (page: number): string => {
  return `/custom-recommend?page=${page}`;
};

export default async function CustomRecommendListPage({
  searchParams,
}: CustomRecommendListPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = getValidPage(resolvedSearchParams?.page);

  const recommendList = await customRecommendListService.getCustomList(currentPage);
  const items = recommendList.items ?? [];
  const totalPages = recommendList.total_pages ?? 1;

  return (
    <section className={styles.recommendContainer}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Curated list</p>
        <h1 className={styles.title}>Highly recommended</h1>
        <p className={styles.description}>
          A custom TMDB list with selected movies and shows.
        </p>
      </div>

      <div className={styles.toolbar}>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <span>
          {items.length} items
        </span>
      </div>

      {items.length > 0 ? (
        <div className={styles.gridContainer}>
          {items.map((movie) => (
            <RecommendListComponent key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No recommendations found</h2>
          <p className={styles.emptyText}>
            Try another page or reload the list.
          </p>
        </div>
      )}

      <nav className={styles.pagination} aria-label="Recommended list pagination">
        {currentPage > 1 ? (
          <Link
            href={buildRecommendPageHref(currentPage - 1)}
            className={styles.paginationButton}
          >
            Previous
          </Link>
        ) : (
          <span className={styles.disabledButton}>Previous</span>
        )}

        <span className={styles.currentPage}>{currentPage}</span>

        {currentPage < totalPages ? (
          <Link
            href={buildRecommendPageHref(currentPage + 1)}
            className={styles.paginationButton}
          >
            Next
          </Link>
        ) : (
          <span className={styles.disabledButton}>Next</span>
        )}
      </nav>
    </section>
  );
}