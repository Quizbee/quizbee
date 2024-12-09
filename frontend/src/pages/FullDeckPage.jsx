import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useModal from '../hooks/useModal';
import { getDeckById, deleteDeck } from '../services/deckService';
import {
  getFlashcardsByDeck,
  updateFlashcard,
  deleteFlashcard,
} from '../services/flashcardService';
import { createFlashcard } from '../services/flashcardService';

import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import LoadingSpinner from '../components/LoadingSpinner';

const FullDeck = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDeckModalOpen, setDeleteDeckModalOpen] = useState(false);

  // Use the custom hook for managing modal state and actions
  const { modalOpen, currentCard, openModal, closeModal } = useModal();

  useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        const token = localStorage.getItem('token');
        const fetchedDeck = await getDeckById(token, deckId);
        const fetchedFlashcards = await getFlashcardsByDeck(token, deckId);
        setDeck(fetchedDeck);
        setFlashcards(fetchedFlashcards);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch deck or flashcards:', error);
      }
    };

    fetchDeckAndFlashcards();
  }, [deckId]);

  const handleCreateClick = () => {
    setNewCard({ front: '', back: '' });
    setCreateModalOpen(true);
  };

  const handleCreateConfirm = async (cardData) => {
    try {
      const token = localStorage.getItem('token');
      const createdCard = await createFlashcard(token, {
        ...cardData,
        deck_id: deckId,
      });
      setFlashcards([...flashcards, createdCard]);
      setCreateModalOpen(false);
      toast.success('Flashcard added successfully!');
    } catch (error) {
      toast.error('Failed to create flashcard');
      console.error('Failed to create flashcard:', error);
    }
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (cardToDelete) {
      try {
        await deleteCard(cardToDelete.id);
        setDeleteModalOpen(false);
        setCardToDelete(null);
        toast.success('Flashcard deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete flashcard');
      }
    }
  };

  const saveCard = async (updatedCard) => {
    try {
      const token = localStorage.getItem('token');
      const savedCard = await updateFlashcard(
        token,
        updatedCard.id,
        updatedCard
      );
      const updatedFlashcards = flashcards.map((card) =>
        card.id === savedCard.id ? savedCard : card
      );
      setFlashcards(updatedFlashcards);
      toast.success('Flashcard updated successfully!');
    } catch (error) {
      toast.error('Failed to update flashcard');
      console.error('Failed to update flashcard:', error);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteFlashcard(token, cardId);
      const updatedFlashcards = flashcards.filter((card) => card.id !== cardId);
      setFlashcards(updatedFlashcards);
    } catch (error) {
      console.error('Failed to delete flashcard:', error);
    }
  };

  const handleDeleteDeck = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteDeck(token, deckId);
      setDeleteDeckModalOpen(false);
      navigate('/dashboard');
      toast.success('Deck deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete deck');
      console.error('Failed to delete deck:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-black px-6 py-8 text-white lg:px-8">
      {/* Fixed Header Section */}
      <div className="mb-8 flex w-full flex-col items-center">
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

        <h2 className="mb-4 text-3xl font-bold text-yellow-200">
          {deck.name} - Deck
        </h2>

        <p className="mb-10 text-white">{deck.description}</p>

        {/* Action buttons */}
        <div className="mb-10 flex w-full justify-center gap-4">
          <button
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-medium text-black shadow-lg transition-all hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl active:scale-95"
            onClick={() => navigate(`/decks/${deckId}/study`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 transition-transform group-hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
            <span>Study Deck</span>
          </button>
          <button
            onClick={handleCreateClick}
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-200/90 to-yellow-300/90 px-6 py-3 font-medium text-black shadow-lg transition-all hover:from-yellow-300/90 hover:to-yellow-400/90 hover:shadow-xl active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 transition-transform group-hover:rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add Flashcard</span>
          </button>
          <button
            onClick={() => setDeleteDeckModalOpen(true)}
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500/90 to-red-600/90 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-red-600/90 hover:to-red-700/90 hover:shadow-xl active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 transition-transform group-hover:rotate-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <span>Delete Deck</span>
          </button>
        </div>
      </div>

      {/* Scrollable Flashcards Grid Container */}
      <div className="h-[calc(100vh-24rem)] flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {flashcards.map((card, index) => (
            <div
              key={index}
              className="relative flex h-[300px] min-w-[300px] flex-col items-center justify-between rounded-xl border border-zinc-600 bg-gradient-to-br from-zinc-700 to-zinc-800 p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-zinc-600 hover:to-zinc-700 hover:shadow-xl"
            >
              {/* Content Area */}
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="w-full space-y-6 text-center">
                  <div>
                    <span className="inline-block bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-sm font-semibold uppercase tracking-widest text-transparent">
                      Question
                    </span>
                    <p className="mt-2 line-clamp-2 max-h-24 text-lg font-bold tracking-wide text-zinc-100">
                      {card.front}
                    </p>
                  </div>
                  <div>
                    <span className="inline-block bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-sm font-semibold uppercase tracking-widest text-transparent">
                      Answer
                    </span>
                    <p className="mt-2 line-clamp-2 text-base font-medium leading-relaxed text-zinc-200">
                      {card.back}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons Container */}
              <div className="mt-auto grid w-full grid-cols-2 gap-4">
                <button
                  onClick={() => handleDeleteClick(card)}
                  className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-red-500/80 to-red-600/80 px-3 py-2 font-medium text-white/90 shadow-md transition-all duration-200 hover:from-red-500/90 hover:to-red-600/90 hover:shadow-lg active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span className="text-sm">Delete</span>
                </button>
                <button
                  onClick={() => openModal(card)}
                  className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-green-500/80 to-green-600/80 px-3 py-2 font-medium text-white/90 shadow-md transition-all duration-200 hover:from-green-500/90 hover:to-green-600/90 hover:shadow-lg active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span className="text-sm">Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <EditModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateConfirm}
        card={newCard}
        type="Add"
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Flashcard"
        message="Are you sure you want to delete this flashcard? This action cannot be undone."
      />

      <EditModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={saveCard}
        onDelete={deleteCard}
        card={currentCard}
        type="Edit"
      />

      <DeleteModal
        isOpen={deleteDeckModalOpen}
        onClose={() => setDeleteDeckModalOpen(false)}
        onConfirm={handleDeleteDeck}
        title="Delete Deck"
        message="Are you sure you want to delete this deck? This action cannot be undone."
      />
    </div>
  );
};

export default FullDeck;
