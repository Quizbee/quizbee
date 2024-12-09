import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../contexts/AuthContext';
import { getUserDecks, createDeck, updateDeck } from '../services/deckService';
import { getFlashcardsByDeck } from '../services/flashcardService';

import DeckPreview from '../components/DeckPreview';
import EditDeckModal from '../components/EditDeckModal';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDecksAndFlashcards = async () => {
      try {
        const token = localStorage.getItem('token');
        const fetchedDecks = await getUserDecks(token);

        const decksWithFlashcards = await Promise.all(
          fetchedDecks.map(async (deck) => {
            const flashcards = await getFlashcardsByDeck(token, deck.id);
            return { ...deck, flashcards };
          })
        );

        setDecks(decksWithFlashcards);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch decks or flashcards:', error);
      }
    };

    fetchDecksAndFlashcards();
  }, []);

  const handleViewDeck = (deckId) => {
    navigate(`/decks/${deckId}`);
  };

  const handleCreateDeck = async (deckData) => {
    try {
      const token = localStorage.getItem('token');
      // Create deck with user_id included
      const newDeck = await createDeck(token, {
        ...deckData,
      });
      // Add empty flashcards array to match the state structure
      setDecks([...decks, { ...newDeck, flashcards: [] }]);
      setCreateModalOpen(false);
      toast.success('Deck created successfully!');
    } catch (error) {
      toast.error('Failed to create deck');
      console.error('Failed to create deck:', error);
    }
  };

  const handleEditDeck = async (updatedDeck) => {
    try {
      const token = localStorage.getItem('token');
      const savedDeck = await updateDeck(token, currentDeck.id, updatedDeck);
      setDecks(
        decks.map((deck) =>
          deck.id === savedDeck.id
            ? { ...savedDeck, flashcards: deck.flashcards }
            : deck
        )
      );
      setEditModalOpen(false);
      toast.success('Deck updated successfully!');
    } catch (error) {
      toast.error('Failed to update deck');
      console.error('Failed to update deck:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col bg-black px-6 py-12 text-white lg:px-8">
      <div className="mx-auto w-full max-w-[90rem]">
        <Typography
          variant="h1"
          className="mb-12 text-center !text-xl lg:!text-4xl"
        >
          Welcome <span className="text-yellow-200">{user.username}</span>!
        </Typography>
        {decks.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <Typography variant="h2" className="!text-xl lg:!text-3xl">
                Your <span className="text-yellow-200">Decks</span>
              </Typography>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-200/90 to-yellow-300/90 px-6 py-3 font-medium text-black shadow-lg transition-all hover:from-yellow-300/90 hover:to-yellow-400/90 hover:shadow-xl active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 transition-transform group-hover:rotate-90"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Create New Deck</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {decks.map((deck) => (
                <DeckPreview
                  key={deck.id}
                  deck={deck}
                  onViewDeck={handleViewDeck}
                  onEditDeck={() => {
                    setCurrentDeck(deck);
                    setEditModalOpen(true);
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-6 h-24 w-24 text-yellow-200/80"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>

            <Typography
              variant="h2"
              className="mb-4 text-2xl font-bold text-yellow-200/90 md:text-3xl"
            >
              Start Your Learning Journey
            </Typography>

            <Typography
              variant="lead"
              className="mb-8 max-w-md text-base text-zinc-400 md:text-lg"
            >
              Create your first flashcard deck and begin mastering new topics
              today!
            </Typography>

            <button
              className="group inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-yellow-200/90 to-yellow-300/90 px-8 py-4 font-medium text-black shadow-lg transition-all hover:from-yellow-300/90 hover:to-yellow-400/90 hover:shadow-xl active:scale-95"
              onClick={() => setCreateModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6 transition-transform group-hover:rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="text-lg">Create Your First Deck</span>
            </button>
          </div>
        )}

        <EditDeckModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSave={handleCreateDeck}
          mode="create"
        />

        <EditDeckModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditDeck}
          deck={currentDeck}
          mode="edit"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
