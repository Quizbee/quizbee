import { useState, useEffect } from 'react';

const EditDeckModal = ({
  isOpen,
  onClose,
  onSave,
  deck,
  mode = 'create',
}) => {
  const [deckData, setDeckData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (deck && mode === 'edit') {
      setDeckData({ name: deck.name, description: deck.description });
    } else {
      setDeckData({ name: '', description: '' });
    }
  }, [deck, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(deckData);
    if (mode === 'create') {
      setDeckData({ name: '', description: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-zinc-800 p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-yellow-200">
          {mode === 'create' ? 'Create New Deck' : 'Edit Deck'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-300">Name</label>
            <input
              type="text"
              value={deckData.name}
              onChange={(e) =>
                setDeckData({ ...deckData, name: e.target.value })
              }
              className="mt-1 w-full rounded bg-zinc-700 p-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300">Description</label>
            <textarea
              value={deckData.description}
              onChange={(e) =>
                setDeckData({ ...deckData, description: e.target.value })
              }
              className="mt-1 w-full rounded bg-zinc-700 p-2 text-white"
              rows="3"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-zinc-600 px-4 py-2 text-white transition hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-yellow-200 px-4 py-2 text-black transition hover:bg-yellow-300"
            >
              {mode === 'create' ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDeckModal;
