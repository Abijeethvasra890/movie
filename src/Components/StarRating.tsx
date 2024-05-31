import StarRatings from 'react-star-ratings';

type StarRatingProps = {
  rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <StarRatings
      rating={rating / 2}
      starRatedColor="#EF4444"
      numberOfStars={5}
      name='rating'
      starDimension="20px"
      starSpacing="2px"
    />
  );
};

export default StarRating;
