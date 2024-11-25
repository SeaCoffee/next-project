import Link from "next/link";

import {customRecommendListService} from "@/app/services/APIServices/APIServices";
import RecommendListComponent from "@/app/components/RecommendListComponent/RecommendListComponent";

import styles from './RecommendList.module.css';



const CustomRecommendPaginationPage = async ({ params }: CustomRecommendPaginationProps): Promise<JSX.Element> => {
    const currentPage = Number(params.page) || 1;
    const recommendList = await customRecommendListService.getCustomList(currentPage);

    return (
        <div className={styles.recommendContainer}>
            <h1>Highly Recommend - Page {currentPage}</h1>
            <div className={styles.gridContainer}>
                {recommendList.items.map((movie: ICustomMovie) => (
                    <RecommendListComponent key={movie.id} movie={movie} />
                ))}
            </div>
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <Link href={`/custom-recommend/page/${currentPage - 1}`} className={styles.paginationButton}>
                        Previous
                    </Link>
                )}
                {currentPage < recommendList.total_pages && (
                    <Link href={`/custom-recommend/page/${currentPage + 1}`} className={styles.paginationButton}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CustomRecommendPaginationPage;