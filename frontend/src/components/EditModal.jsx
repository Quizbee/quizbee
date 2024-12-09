import { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

const EditModal = ({ isOpen, onClose, onSave, card, type }) => {
  if (!isOpen) return null;

  const [editedCard, setEditedCard] = useState({ ...card });

  useEffect(() => {
    setEditedCard({ ...card });
  }, [card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm transition-all">
      <div className="w-full max-w-2xl transform rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-2xl transition-all">
        <Typography variant="h1" className="mb-6 text-2xl font-bold">
          {type} <span className="text-yellow-200">Flashcard</span>
        </Typography>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Question
          </label>
          <input
            type="text"
            name="front"
            value={editedCard.front}
            onChange={handleChange}
            className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white shadow-inner transition-all placeholder:text-zinc-500 focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-200/20"
          />
        </div>

        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Answer
          </label>
          <input
            type="text"
            name="back"
            value={editedCard.back}
            onChange={handleChange}
            className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white shadow-inner transition-all placeholder:text-zinc-500 focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-200/20"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-600 bg-transparent px-6 py-2.5 text-white transition-all hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-yellow-200 px-6 py-2.5 font-medium text-black transition-all hover:bg-yellow-300"
          >
            {type === 'Create' ? 'Create Flashcard' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
