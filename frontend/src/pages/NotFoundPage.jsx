// frontend/src/pages/NotFoundPage.jsx
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center bg-black px-6 py-12 text-white">
      <h1 className="mb-8 text-6xl font-bold text-yellow-200">404</h1>
      <p className="mb-12 text-xl">Oops! This page doesn't exist.</p>
      <button
        onClick={() => navigate(user ? '/dashboard' : '/')}
        className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-200/90 to-yellow-300/90 px-6 py-3 font-medium text-black shadow-lg transition-all hover:from-yellow-300/90 hover:to-yellow-400/90 hover:shadow-xl active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>Return {user ? 'to Dashboard' : 'Home'}</span>
      </button>
    </div>
  );
};

export default NotFoundPage;
