import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDeckById } from '../services/deckService';
import { getFlashcardsByDeck } from '../services/flashcardService';

import LoadingSpinner from '../components/LoadingSpinner';

const StudyPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const token = localStorage.getItem('token');
        const fetchedDeck = await getDeckById(token, deckId);
        const fetchedCards = await getFlashcardsByDeck(token, deckId);

        setDeck(fetchedDeck);
        setCards(isQuizMode ? shuffleArray(fetchedCards) : fetchedCards);
        // Initialize progress tracking
        setProgress(
          fetchedCards.reduce(
            (acc, card) => ({
              ...acc,
              [card.id]: 'unseen',
            }),
            {}
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch deck/cards:', error);
      }
    };
    fetchDeckAndCards();
  }, [deckId, isQuizMode]);

  const shuffleArray = (array) => {
    // Create a copy to avoid mutating original array
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleCardClick = () => setIsFlipped(!isFlipped);

  const markCard = (status) => {
    if (cards[currentCardIndex]) {
      setProgress((prev) => ({
        ...prev,
        [cards[currentCardIndex].id]: status,
      }));
      // Don't try to advance if we're on the last card
      if (currentCardIndex < cards.length - 1) {
        handleNext();
      } else {
        setIsFlipped(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const currentCard = cards[currentCardIndex];
  const progressCount = Object.values(progress).filter(
    (v) => v !== 'unseen'
  ).length;

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col bg-black px-6 py-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(`/decks/${deckId}`)}
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Back to Deck</span>
        </button>
        <button
          onClick={() => {
            setIsQuizMode(!isQuizMode);
            setCards((prev) => (isQuizMode ? prev : shuffleArray(prev)));
            setCurrentCardIndex(0); // Reset to first card
            setIsFlipped(false); // Reset flip state
          }}
          className="rounded-lg bg-yellow-200 px-4 py-2 text-black"
        >
          {isQuizMode ? 'Study Mode' : 'Quiz Mode'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {progressCount}/{cards.length} Cards
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-yellow-200 transition-all"
            style={{ width: `${(progressCount / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card Viewer */}
      <div className="perspective-1000 flex flex-1 items-center justify-center">
        <div
          onClick={handleCardClick}
          className="relative h-96 w-full max-w-2xl cursor-pointer"
        >
          {/* Card Container - handles the flip transform */}
          <div
            className="preserve-3d relative h-full w-full transition-transform duration-500"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : '' }}
          >
            {/* Front face */}
            <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 p-8">
              <span className="mb-4 inline-block bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-sm font-semibold uppercase tracking-widest text-transparent">
                Question
              </span>
              <p className="text-xl font-medium">{currentCard.front}</p>
            </div>

            {/* Back face */}
            <div
              className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 p-8"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <span className="mb-4 inline-block bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-sm font-semibold uppercase tracking-widest text-transparent">
                Answer
              </span>
              <p className="text-xl font-medium">{currentCard.back}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex justify-center gap-4">
        {!isQuizMode && (
          <>
            <button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className="rounded-lg bg-zinc-700 px-6 py-3 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentCardIndex === cards.length - 1}
              className="rounded-lg bg-zinc-700 px-6 py-3 disabled:opacity-50"
            >
              Next
            </button>
          </>
        )}
        {isQuizMode && (
          <>
            <button
              onClick={() => markCard('needs-review')}
              className="rounded-lg bg-red-500 px-6 py-3"
            >
              Need Review
            </button>
            <button
              onClick={() => markCard('learned')}
              className="rounded-lg bg-green-500 px-6 py-3"
            >
              Learned
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyPage;
