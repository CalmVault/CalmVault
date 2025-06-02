interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400">
          ☆
        </span>
      );
    }
  }

  return <div className="flex">{stars}</div>;
}

export default StarRating;
