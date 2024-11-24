import React from 'react';
import { Tooltip } from '@nextui-org/react';

const StarsRatingComponent: React.FC<{ rating: number; maxStars?: number }> = ({
                                                                                   rating,
                                                                                   maxStars = 5,
                                                                               }) => {
    console.log('Rating received:', rating); // Проверяем, какое значение передается

    const filledStars = Math.round(rating); // Количество заполненных звезд
    const emptyStars = maxStars - filledStars; // Количество пустых звезд

    const StarFilled = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gold"
            width="20"
            height="20"
            viewBox="0 0 24 24"
        >
            <path d="M12 .587l3.668 7.435 8.2 1.192-5.934 5.779 1.4 8.164-7.334-3.857-7.334 3.857 1.4-8.164-5.934-5.779 8.2-1.192z" />
        </svg>
    );

    const StarEmpty = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
            width="20"
            height="20"
            viewBox="0 0 24 24"
        >
            <path d="M12 .587l3.668 7.435 8.2 1.192-5.934 5.779 1.4 8.164-7.334-3.857-7.334 3.857 1.4-8.164-5.934-5.779 8.2-1.192z" />
        </svg>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {/* Заполненные звезды */}
            {[...Array(filledStars)].map((_, i) => (
                <Tooltip key={`filled-${i}`} content={`Rating: ${rating}`}>
                    <StarFilled />
                </Tooltip>
            ))}
            {/* Пустые звезды */}
            {[...Array(emptyStars)].map((_, i) => (
                <Tooltip key={`empty-${i}`} content="No rating">
                    <StarEmpty />
                </Tooltip>
            ))}
        </div>
    );
};

export default StarsRatingComponent;
