import ReactStars from 'react-rating-stars-component';

type StarRatingProps = {
  rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <ReactStars
      count={5}
      value={rating / 2}
      size={20}
      edit={false}
      activeColor="#EF4444"
    />
  );
};

export default StarRating;
