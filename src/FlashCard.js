import React from 'react';

const FlashCard = ({ front, back, showFront, setShowFront }) => {
  const handleClick = () => {
    setShowFront(!showFront);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-8 m-4 w-64 h-64 flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-2">{showFront ? front : back}</h2>
        <p className="text-xl">{showFront ? "Japanese" : "English"}</p>
      </div>
    </div>
  );
};

export default FlashCard;