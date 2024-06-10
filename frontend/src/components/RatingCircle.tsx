import React from 'react';

const RatingCircle = ({ score }: { score: number }) => {
  return (
    <div>
      {Array.from({ length: score }, (_, index) => (
        <div key={index} className="rating-circle" data-value={score}></div>
      ))}
    </div>
  );
};

export default RatingCircle;
