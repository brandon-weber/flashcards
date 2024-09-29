import React, { useState } from 'react';

const FlashCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-8 m-4 w-64 h-64 flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-2">{isFlipped ? back : front}</h2>
        <p className="text-xl">{isFlipped ? "English" : "Japanese"}</p>
      </div>
    </div>
  );
};

export default FlashCard;