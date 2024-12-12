# QuizBee - Flashcard Study App

QuizBee is a web-based flashcard application that helps users create, manage, and study flashcards. Built with React and Node.js, it offers a simple and user-friendly interface for creating custom organized flashcard decks, studying them using a quiz-style interface, and tracking progress over time.

## Features

- **User Authentication**: Secure login and registration system
- **Deck Management**: Create, edit, and delete custom flashcard decks
- **Flashcard Creation**: Add, edit, and remove flashcards within decks
- **Study Modes**:
  - Regular study mode with manual card flipping
  - Quiz mode with progress tracking
- **Progress Tracking**: Monitor learning progress across decks

## Tech Stack

### Frontend

- React
- React Router DOM
- TailwindCSS
- Material Tailwind
- Vite
- React Toastify

### Backend

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Joi Validation

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Quizbee/quizbee.git
```

2. Set up environment variables:

- Copy .env.example to .env in both frontend and backend directories
- Configure the variables according to your setup

3. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

4. Initialize the database:

```bash
# Using Docker
docker-compose up -d

# Manual setup
psql -U <username> -d <database> -f db/init.sql
```

5. Start the development servers:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## Database Schema

- **Users**: Store user information and authentication details
- **Decks**: Manage flashcard collections
- **Flashcards**: Store individual cards with question/answer content

## API Endpoints

- **Auth**: `/auth/register`, `/auth/login`
- **Users**: `/api/users/me`
- **Decks**: `/api/decks`
- **Flashcards**: `/api/flashcards`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

- [@hennasavilahti](https://www.github.com/hennasavilahti)
- [@tommiri](https://www.github.com/tommiri)

## License

This project is licensed under the ISC License
