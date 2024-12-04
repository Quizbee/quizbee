import { useState } from 'react';

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const openModal = (card) => {
    setCurrentCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCard(null);
  };

  return {
    modalOpen,
    currentCard,
    openModal,
    closeModal,
  };
};

export default useModal;
