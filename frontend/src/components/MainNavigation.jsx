import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import logo from '../assets/logo.png';
import { AuthContext } from '../contexts/AuthContext';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <header className="fixed z-50 flex w-full items-center justify-between border-b-2 border-zinc-900 bg-black px-8 py-0 text-white md:px-32">
        <button>
          <img
            src={logo}
            alt="Logo"
            className="w-40 transition-all hover:scale-105"
            onClick={user ? () => navigate('/dashboard') : () => navigate('/')}
          ></img>
        </button>
        <ul className="hidden items-center gap-12 text-base font-semibold xl:flex">
          {user ? (
            <>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={() => navigate('/')}
              >
                Get Started
              </button>

              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </>
          )}
        </ul>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:scale-105 hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden"
          ripple={false}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>

        <div
          className={`absolute left-0 top-44 z-50 flex w-full flex-col items-center gap-6 border-b-2 border-zinc-900 bg-black pb-6 text-lg font-semibold transition-transform xl:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'transform 0.3s ease, opacity 0.3 ease' }}
        >
          {user ? (
            <>
              <button
                className="w-full cursor-pointer p-5 text-center transition-all hover:scale-105"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full cursor-pointer p-5 text-center transition-all hover:scale-105"
                onClick={() => navigate('/')}
              >
                Get Started
              </button>
              <button
                className="rounded-md p-3 text-xl transition-all hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default MainNavigation;
