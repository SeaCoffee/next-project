import {imageService} from "@/app/services/APIServices/APIServices";
import styles from './PosterComponent.module.css';

interface PosterProps {
    url?: string | null;
    alt: string;
}

const PosterComponent: React.FC<PosterProps> = ({ url, alt }) => {
    const posterUrl = url ? imageService.getPosterUrl(url) : '/media/default-image.jpg';

    return (
        <img
            src={posterUrl}
            alt={alt}
            className={styles.image}
        />
    );
};


export default PosterComponent;

