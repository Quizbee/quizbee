const API_URL = `${import.meta.env.VITE_API_URL}/api/flashcards`;

export const getFlashcardsByDeck = async (token, deckId) => {
  const response = await fetch(`${API_URL}/deck/${deckId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }

  return await response.json();
};

export const getFlashcardById = async (token, flashcardId) => {
  const response = await fetch(`${API_URL}/${flashcardId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch flashcard');
  }

  return await response.json();
};

export const createFlashcard = async (token, flashcardData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flashcardData),
  });

  if (!response.ok) {
    throw new Error('Failed to create flashcard');
  }

  return await response.json();
};

export const updateFlashcard = async (token, flashcardId, flashcardData) => {
  const { deck_id, front, back } = flashcardData;

  const response = await fetch(`${API_URL}/${flashcardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deck_id, front, back }),
  });

  if (!response.ok) {
    throw new Error('Failed to update flashcard');
  }

  return await response.json();
};

export const deleteFlashcard = async (token, flashcardId) => {
  const response = await fetch(`${API_URL}/${flashcardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete flashcard');
  }

  return await response.json();
};
