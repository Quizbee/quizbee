import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { decks } from '../../data/deck'; // Import your decks data
import Modal from '../components/Modal'; // Import Modal component
import useModal from '../hooks/useModal'; // Import the custom hook

const FullDeck = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deckData, setDeckData] = useState(decks); // Manage the deck data

  // Use the custom hook for managing modal state and actions
  const { modalOpen, currentCard, openModal, closeModal } = useModal();

  const deck = deckData.find((d) => d.id === deckId); // Find the deck

  const saveCard = (updatedCard) => {
    const updatedDeck = deckData.map((d) => {
      if (d.id === deckId) {
        const updatedCards = d.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        );
        return { ...d, cards: updatedCards };
      }
      return d;
    });
    setDeckData(updatedDeck);
  };

  const deleteCard = (cardId) => {
    const updatedDeck = deckData.map((d) => {
      if (d.id === deckId) {
        const updatedCards = d.cards.filter((card) => card.id !== cardId);
        return { ...d, cards: updatedCards };
      }
      return d;
    });
    setDeckData(updatedDeck);
  };

  if (!deck) {
    return (
      <div className="text-center text-red-500">
        <p>Deck not found!</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center bg-black px-6 py-8 text-white lg:px-8">
      <button
        className="justify-start-start mt-0 flex w-full"
        onClick={() => navigate('/dashboard')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <a className="pl-4 text-xl">Dashboard</a>
      </button>

      {/* Deck Title */}
      <h2 className="mb-4 text-3xl font-bold text-yellow-200">
        {deck.title} - Deck
      </h2>

      {/* Deck Description */}
      <p className="mb-10 text-white">{deck.description}</p>

      <button className="mb-10 inline-flex items-center rounded border border-white bg-black px-3 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-zinc-700">
        <span className="text-md">Study Deck</span>
      </button>

      {/* Grid Layout for Flashcards */}
      <div className="grid h-60 grid-cols-1 justify-center gap-6 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deck.cards.map((card, index) => (
          <div
            key={index}
            className="flex h-full flex-col items-center justify-between rounded bg-zinc-800 p-4"
          >
            {/* Content Area (Question & Answer) */}
            <div className="flex flex-grow flex-col items-center justify-center">
              <p className="text-center font-semibold italic text-yellow-200">
                Q: {card.question}
              </p>
              <p className="mt-2 text-center text-white">A: {card.answer}</p>
            </div>

            {/* Buttons Container at the Bottom */}
            <div className="mt-auto grid grid-cols-2 gap-5">
              <button
                className="inline-flex items-center rounded bg-red-400 px-4 py-2 font-bold text-black transition-all hover:scale-105 hover:bg-red-500"
                onClick={() => openModal(card)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                className="inline-flex items-center justify-center rounded bg-green-400 px-2 py-2 font-bold text-black transition-all hover:scale-105 hover:bg-green-500"
                onClick={() => openModal(card)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Edit/Delete */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={saveCard}
        onDelete={deleteCard}
        card={currentCard}
        type="Edit"
      />
    </div>
  );
};

export default FullDeck;
