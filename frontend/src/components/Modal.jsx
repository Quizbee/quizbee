import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';

const Modal = ({ isOpen, onClose, onSave, onDelete, card, type }) => {
  if (!isOpen) return null;

  const [editedCard, setEditedCard] = useState(card);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedCard);
    onClose();
  };

  const handleDelete = () => {
    onDelete(card.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50 px-80">
      <div className="w-full rounded bg-black p-10">
        <Typography
          variant="h1"
          className="my-4 w-full !text-xl leading-snug lg:max-w-xl lg:!text-3xl"
        >
          {type} <span className="leading-snug text-yellow-200">Card</span>
        </Typography>
        <div className="mb-4">
          <label className="mb-2 block text-white">Question</label>
          <input
            type="text"
            name="question"
            value={editedCard.question}
            onChange={handleChange}
            className="block w-full rounded-md bg-zinc-700 px-3 py-3 text-base text-white outline outline-1 -outline-offset-1 outline-white placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-200 sm:text-sm/6"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-white">Answer</label>
          <input
            type="text"
            name="answer"
            value={editedCard.answer}
            onChange={handleChange}
            className="block w-full rounded-md bg-zinc-700 px-3 py-3 text-base text-white outline outline-1 -outline-offset-1 outline-white placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-200 sm:text-sm/6"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="rounded bg-green-400 px-4 py-2 text-black"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-400 px-4 py-2 text-black"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="rounded bg-yellow-200 px-4 py-2 text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
