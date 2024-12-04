import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import DeckPreview from '../components/DeckPreview';
import { decks } from '../../data/deck';

const DashboardPage = () => {
  const user = 'User';

  const navigate = useNavigate();

  const handleViewDeck = (deckId) => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center bg-black px-6 py-12 text-white lg:px-8">
      <Typography
        variant="h1"
        className="my-4 w-full text-center !text-xl leading-snug lg:max-w-xl lg:!text-4xl"
      >
        Welcome <span className="leading-snug text-yellow-200">{user}</span>!
      </Typography>
      <div className="w-full">
        <div className="flex flex-col items-start px-20 text-left">
          <Typography
            variant="h1"
            className="my-4 w-full !text-xl leading-snug lg:max-w-xl lg:!text-3xl"
          >
            Your <span className="leading-snug text-yellow-200">Decks</span>:
          </Typography>
          <button className="mb-6 mt-1 inline-flex items-center rounded border border-white bg-black px-3 py-3 font-bold text-white hover:scale-105 hover:bg-zinc-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-3 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>

            <span className="text-lg">Create New Deck</span>
          </button>
          {decks ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {decks.map((deck) => (
                <DeckPreview
                  key={deck.id}
                  deck={deck}
                  onViewDeck={handleViewDeck}
                />
              ))}
            </div>
          ) : (
            <>
              <Typography
                variant="lead"
                className="text-base text-gray-300 lg:text-lg"
              >
                You don't currently have any decks
              </Typography>
              <button className="mt-6 inline-flex items-center rounded border border-white bg-black px-3 py-3 font-bold text-white hover:scale-105 hover:bg-zinc-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>

                <span className="text-lg">Create Your First Deck</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
