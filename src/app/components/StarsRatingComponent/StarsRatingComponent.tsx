import styles from './StarsRatingComponent.module.css';

type Props = {
  rating: number | null | undefined;
  maxStars?: number;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export default function StarsRatingComponent({
  rating,
  maxStars = 5,
}: Props) {
  if (typeof rating !== 'number' || Number.isNaN(rating)) {
    return (
      <span className={styles.noRating}>
        No rating
      </span>
    );
  }

  const normalizedRating = clamp(rating, 0, 10);
  const filledStars = Math.round((normalizedRating / 10) * maxStars);
  const emptyStars = maxStars - filledStars;

  return (
    <div
      className={styles.rating}
      title={`Rating: ${normalizedRating.toFixed(1)} out of 10`}
      aria-label={`Rating: ${normalizedRating.toFixed(1)} out of 10`}
    >
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: filledStars }).map((_, index) => (
          <span key={`filled-${index}`} className={styles.starFilled}>
            ★
          </span>
        ))}

        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className={styles.starEmpty}>
            ★
          </span>
        ))}
      </span>

      <span className={styles.value}>
        {normalizedRating.toFixed(1)}
      </span>
    </div>
  );
}