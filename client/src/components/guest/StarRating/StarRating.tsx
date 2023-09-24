import icons from "../../../utils/icons";

const { AiTwotoneStar } = icons;

interface StarRatingProps {
  totalRatings: number;
  size: number;
}

const StarRating = (props: StarRatingProps) => {
  const { totalRatings, size } = props;

  const fullStars = Math.round(totalRatings);
  const remainingStars = 5 - fullStars;

  return (
    <>
      {Array.from({ length: fullStars }, (_, index) => (
        <AiTwotoneStar key={index} size={size} />
      ))}
      {Array.from({ length: remainingStars }, (_, index) => (
        <div key={index} className="text-main-100">
          <AiTwotoneStar size={size} />
        </div>
      ))}
    </>
  );
};

export default StarRating;
