import {customRecommendListService} from "@/app/services/APIServices/APIServices";
import RecommendListComponent from "@/app/components/RecommendListComponent/RecommendListComponent";
import Link from "next/link";
import styles from './RecommendList.module.css';

const CustomRecommendListPage = async (): Promise<JSX.Element> => {
    const currentPage = 1;
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
                {recommendList.total_pages > 1 && (
                    <Link href={`/custom-recommend/page/${currentPage + 1}`} className={styles.paginationButton}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CustomRecommendListPage;



