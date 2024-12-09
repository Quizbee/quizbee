const DeckPreview = ({ deck, onViewDeck, onEditDeck }) => {
  const { name, description, flashcards } = deck;

  return (
    <div className="flex h-full min-h-[24rem] w-full flex-col rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 text-center shadow-lg transition-all duration-300 ease-in-out">
      {/* Header Section - Fixed Height */}
      <div className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-yellow-200/90">{name}</h2>
        <p className="text-zinc-300">{description}</p>
      </div>

      {/* Content Section - Flexible Height */}
      <div className="flex-1">
        {flashcards.length > 0 ? (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-yellow-200/90">
              Preview:
            </h3>
            <div className="space-y-3">
              {flashcards.slice(0, 3).map((flashcard, index) => (
                <div
                  key={index}
                  className="mx-auto max-w-[90%] rounded-md bg-zinc-800/50 p-3 shadow-md transition-transform hover:scale-[1.02]"
                >
                  <div className="text-sm text-zinc-300">
                    <strong className="text-yellow-200/90">Q: </strong>
                    {flashcard.front}
                  </div>
                </div>
              ))}
              {flashcards.length > 3 && (
                <p className="mt-2 text-sm text-yellow-200/80">
                  + {flashcards.length - 3} more flashcards
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-yellow-200/80">No flashcards yet.</p>
        )}
      </div>

      {/* Footer Section - Fixed Position */}
      <div className="mt-auto flex justify-between">
        <button
          onClick={() => onViewDeck(deck.id)}
          className="w-full rounded bg-yellow-200 px-4 py-2 text-zinc-900 transition hover:bg-yellow-300"
        >
          View Deck
        </button>
        <button
          onClick={onEditDeck}
          className="ml-2 rounded bg-zinc-700 p-2 text-white transition hover:bg-zinc-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DeckPreview;
