-- Enable the UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables to avoid conflicts during reinitialization
DROP TABLE IF EXISTS deck_flashcards,
flashcards,
decks,
users CASCADE;

-- Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Decks Table
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Flashcards Table
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create DeckFlashcards Table (Many-to-Many Relationship)
CREATE TABLE deck_flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (deck_id, flashcard_id)
);

-- Insert Example Data into Users
INSERT INTO
  users (username, email, password_hash)
VALUES
  (
    'john_doe',
    'john.doe@example.com',
    'hashedpassword123'
  ),
  (
    'jane_smith',
    'jane.smith@example.com',
    'hashedpassword456'
  );

-- Insert Example Data into Decks
INSERT INTO
  decks (user_id, name, description)
VALUES
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'john_doe'
    ),
    'Biology Basics',
    'Introduction to Biology topics'
  ),
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'jane_smith'
    ),
    'Physics 101',
    'Basic physics principles'
  ),
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'john_doe'
    ),
    'Exam Prep',
    'General review flashcards for exams'
  );

-- Insert Example Data into Flashcards
INSERT INTO
  flashcards (user_id, front, back)
VALUES
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'john_doe'
    ),
    'What is the powerhouse of the cell?',
    'Mitochondria'
  ),
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'john_doe'
    ),
    'What is the chemical formula for water?',
    'H2O'
  ),
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'jane_smith'
    ),
    'What is Newton''s first law?',
    'An object in motion stays in motion unless acted upon by an external force'
  ),
  (
    (
      SELECT
        id
      FROM
        users
      WHERE
        username = 'jane_smith'
    ),
    'What is the acceleration due to gravity on Earth?',
    '9.8 m/s^2'
  );

-- Link Flashcards to Decks (DeckFlashcards Table)
INSERT INTO
  deck_flashcards (deck_id, flashcard_id)
VALUES
  (
    (
      SELECT
        id
      FROM
        decks
      WHERE
        name = 'Biology Basics'
    ),
    (
      SELECT
        id
      FROM
        flashcards
      WHERE
        front = 'What is the powerhouse of the cell?'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        decks
      WHERE
        name = 'Biology Basics'
    ),
    (
      SELECT
        id
      FROM
        flashcards
      WHERE
        front = 'What is the chemical formula for water?'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        decks
      WHERE
        name = 'Physics 101'
    ),
    (
      SELECT
        id
      FROM
        flashcards
      WHERE
        front = 'What is Newton''s first law?'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        decks
      WHERE
        name = 'Exam Prep'
    ),
    (
      SELECT
        id
      FROM
        flashcards
      WHERE
        front = 'What is the powerhouse of the cell?'
    )
  ),
  (
    (
      SELECT
        id
      FROM
        decks
      WHERE
        name = 'Exam Prep'
    ),
    (
      SELECT
        id
      FROM
        flashcards
      WHERE
        front = 'What is the acceleration due to gravity on Earth?'
    )
  );