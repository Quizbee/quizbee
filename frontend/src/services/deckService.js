const API_URL = `${import.meta.env.VITE_API_URL}/api/decks`;

export const getUserDecks = async (token) => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch decks');
  }

  return await response.json();
};

export const getDeckById = async (token, deckId) => {
  const response = await fetch(`${API_URL}/${deckId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch deck');
  }

  return await response.json();
};

export const createDeck = async (token, deckData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deckData),
  });

  if (!response.ok) {
    throw new Error('Failed to create deck');
  }

  return await response.json();
};

export const updateDeck = async (token, deckId, deckData) => {
  const response = await fetch(`${API_URL}/${deckId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deckData),
  });

  if (!response.ok) {
    throw new Error('Failed to update deck');
  }

  return await response.json();
};

export const deleteDeck = async (token, deckId) => {
  const response = await fetch(`${API_URL}/${deckId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete deck');
  }

  return await response.json();
};
