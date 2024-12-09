import { Typography } from '@material-tailwind/react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md transform rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-2xl transition-all">
        <Typography variant="h3" className="mb-4 text-xl font-bold">
          {title || 'Delete'} <span className="text-red-400">Confirmation</span>
        </Typography>

        <p className="mb-8 text-zinc-300">
          {message ||
            'Are you sure you want to delete this? This action cannot be undone.'}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-600 bg-transparent px-6 py-2.5 text-white transition-all hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 font-medium text-white transition-all hover:from-red-600 hover:to-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
