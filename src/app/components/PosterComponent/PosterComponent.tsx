import { imageUrlBuilder } from '@/app/urls/urls';

import styles from './PosterComponent.module.css';

type PosterProps = {
  url?: string | null;
  alt: string;
  size?: string;
  className?: string;
  priority?: boolean;
};

export default function PosterComponent({
  url,
  alt,
  size = 'w500',
  className = '',
  priority = false,
}: PosterProps) {
  const posterUrl = imageUrlBuilder.posterUrl(url, size);

  return (
    <img
      src={posterUrl}
      alt={alt}
      className={`${styles.image} ${className}`}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}