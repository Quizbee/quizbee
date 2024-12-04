import React from 'react';

import { decks } from '../../data/deck';

const DeckPreview = ({ deck, onViewDeck }) => {
  const { title, description, cards } = deck;

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg bg-zinc-800 p-6 text-center transition-all hover:scale-105">
      {/* Deck Title */}
      <h2 className="mb-2 text-xl font-bold text-yellow-200">{title}</h2>

      {/* Deck Description */}
      <p className="mb-4 text-white">{description}</p>

      {/* Card Preview */}
      <div className="mb-4 flex-grow">
        <h3 className="text-lg font-semibold text-yellow-200">Preview:</h3>
        <ul className="text-sm text-white">
          {cards.slice(0, 3).map((card, index) => (
            <li key={index}>
              <strong>Q:</strong> {card.question}
            </li>
          ))}
          {cards.length > 3 && (
            <li className="text-yellow-200">+ {cards.length - 3} more cards</li>
          )}
        </ul>
      </div>

      {/* Action Button */}
      <button
        className="rounded bg-yellow-200 px-4 py-2 text-black transition hover:bg-yellow-300"
        onClick={() => onViewDeck(deck.id)}
      >
        View Deck
      </button>
    </div>
  );
};

export default DeckPreview;
