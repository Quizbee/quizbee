import React from 'react';

const DeckPreview = ({ deck, onViewDeck }) => {
  const { title, description, cards } = deck;

  return (
    <div className="w-80 rounded-lg bg-white p-4 shadow-lg">
      {/* Deck Title */}
      <h2 className="mb-2 text-xl font-bold">{title}</h2>

      {/* Deck Description */}
      <p className="mb-4 text-gray-600">{description}</p>

      {/* Card Preview */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Preview:</h3>
        <ul className="text-sm text-gray-700">
          {cards.slice(0, 3).map((card, index) => (
            <li key={index}>
              <strong>Q:</strong> {card.question}
            </li>
          ))}
          {cards.length > 3 && (
            <li className="text-gray-500">+ {cards.length - 3} more cards</li>
          )}
        </ul>
      </div>

      {/* Action Button */}
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        onClick={() => onViewDeck(deck.id)}
      >
        View Deck
      </button>
    </div>
  );
};

export default DeckPreview;
