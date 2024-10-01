import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import { hiragana, katakana } from './characterSets';
import { shuffleArray } from './utils';

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [mode, setMode] = useState('hiragana');
  const [shuffledSet, setShuffledSet] = useState([]);
  const [showJapaneseSide, setShowJapaneseSide] = useState(true); // New state variable

  useEffect(() => {
    let newSet;
    switch (mode) {
      case 'hiragana':
        newSet = hiragana;
        break;
      case 'katakana':
        newSet = katakana;
        break;
      case 'both':
        newSet = [...hiragana, ...katakana];
        break;
      default:
        newSet = hiragana;
    }
    setShuffledSet(shuffleArray(newSet));
    setCurrentCardIndex(0);
    setShowJapaneseSide(true);  // Reset to show front when changing modes
  }, [mode]);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % shuffledSet.length);
    setShowJapaneseSide(true); // Ensure the Japanese side is shown
  };

  const shuffleCards = () => {
    setShuffledSet(shuffleArray([...shuffledSet]));
    setCurrentCardIndex(0);
    setShowJapaneseSide(true);  // Show front when shuffling cards
  };

  const progress = ((currentCardIndex + 1) / shuffledSet.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Hiragana & Katakana Flashcards</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${mode === 'hiragana' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('hiragana')}
        >
          Hiragana
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${mode === 'katakana' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('katakana')}
        >
          Katakana
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${mode === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('both')}
        >
          Both
        </button>
      </div>
      {shuffledSet.length > 0 && (
        <>
          <FlashCard
            front={shuffledSet[currentCardIndex].front}
            back={shuffledSet[currentCardIndex].back}
            showJapaneseSide={showJapaneseSide} // Pass the state
            toggleSide={() => setShowJapaneseSide(!showJapaneseSide)} // Pass the toggle function
          />
          <div className="mt-4 w-64 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-2">
            Progress: {currentCardIndex + 1} / {shuffledSet.length}
          </p>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
              onClick={nextCard}
            >
              Next Card
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={shuffleCards}
            >
              Shuffle Cards
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
